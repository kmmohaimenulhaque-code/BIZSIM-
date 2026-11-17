// Wikipedia, SEC EDGAR, news (Google News RSS) and official website fetchers.

import { fetchText, fetchJson } from '../lib/http.js';
import { config } from '../config.js';

export async function fetchWikipedia(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const data = await fetchJson(url, { timeout: 10000 });
  return {
    title: data.title,
    extract: data.extract,
    url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`,
    thumbnail: data.thumbnail?.source || null,
  };
}

export async function fetchSec(entity) {
  // Resolve ticker / CIK via SEC company tickers, then pull recent 10-K / 20-F facts if possible.
  // SEC requires a descriptive User-Agent with contact email.
  const ua = config.secUserAgent || 'BIZSIM research bot contact@example.com';
  const tickersUrl = 'https://www.sec.gov/files/company_tickers.json';
  let cik = null;
  let ticker = null;
  try {
    const list = await fetchJson(tickersUrl, {
      timeout: 12000,
      headers: { 'user-agent': ua },
    });
    const q = (entity?.label || '').toLowerCase();
    for (const row of Object.values(list || {})) {
      const title = (row.title || '').toLowerCase();
      if (title === q || title.includes(q) || q.includes(title)) {
        cik = String(row.cik_str).padStart(10, '0');
        ticker = row.ticker;
        break;
      }
    }
  } catch (e) {
    return { error: e.message, note: 'SEC ticker lookup failed' };
  }
  if (!cik) return { note: 'No SEC CIK matched', entity: entity?.label };

  // Company facts (XBRL)
  try {
    const factsUrl = `https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`;
    const facts = await fetchJson(factsUrl, {
      timeout: 15000,
      headers: { 'user-agent': ua },
    });
    const usGaap = facts.facts?.['us-gaap'] || {};
    const pick = (key) => {
      const series = usGaap[key]?.units;
      if (!series) return null;
      const usd = series.USD || series['USD/shares'] || Object.values(series)[0];
      if (!usd?.length) return null;
      const last = usd[usd.length - 1];
      return { value: last.val, end: last.end, form: last.form, fy: last.fy, fp: last.fp, tag: key };
    };
    return {
      cik,
      ticker,
      entityName: facts.entityName,
      revenue: pick('Revenues') || pick('RevenueFromContractWithCustomerExcludingAssessedTax') || pick('SalesRevenueNet'),
      netIncome: pick('NetIncomeLoss'),
      assets: pick('Assets'),
    };
  } catch (e) {
    return { cik, ticker, error: e.message };
  }
}

export async function fetchNews(query) {
  // Google News RSS (no key)
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
  try {
    const xml = await fetchText(url, { timeout: 10000 });
    const items = [];
    const re = /<item>[\s\S]*?<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>[\s\S]*?<link>([\s\S]*?)<\/link>/gi;
    let m;
    while ((m = re.exec(xml)) && items.length < 8) {
      items.push({ title: decodeXml(m[1]).trim(), url: m[2].trim() });
    }
    return items;
  } catch (e) {
    return [{ title: 'News fetch failed', url: '', error: e.message }];
  }
}

export async function fetchWebsite(url) {
  if (!url) return null;
  // robots.txt check (best-effort)
  try {
    const u = new URL(url);
    const robots = await fetchText(`${u.origin}/robots.txt`, { timeout: 5000 }).catch(() => '');
    if (/disallow:\s*\//i.test(robots) && !/allow:/i.test(robots)) {
      return { url, note: 'robots.txt appears to disallow crawling; skipped body' };
    }
  } catch {}
  try {
    const html = await fetchText(url, { timeout: 10000 });
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 4000);
    return { url, excerpt: text };
  } catch (e) {
    return { url, error: e.message };
  }
}

function decodeXml(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
