import dns from 'node:dns/promises';
import net from 'node:net';
import { config } from '../config.js';

const DEFAULT_TIMEOUT = 12000;
const MAX_BYTES = 2_000_000;

export async function fetchText(url, { timeout = DEFAULT_TIMEOUT, headers = {} } = {}) {
  await assertSafeUrl(url);
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'user-agent': config.secUserAgent || 'BIZSIM/1.0',
        accept: 'text/html,application/json,text/plain,*/*',
        ...headers,
      },
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = await res.arrayBuffer();
    if (buf.byteLength > MAX_BYTES) throw new Error('response too large');
    return new TextDecoder('utf-8', { fatal: false }).decode(buf);
  } finally {
    clearTimeout(t);
  }
}

export async function fetchJson(url, opts = {}) {
  const text = await fetchText(url, opts);
  return JSON.parse(text);
}

/** Basic SSRF guard: block private/link-local/loopback after DNS resolve. */
export async function assertSafeUrl(urlStr) {
  let u;
  try {
    u = new URL(urlStr);
  } catch {
    throw new Error('invalid url');
  }
  if (!['http:', 'https:'].includes(u.protocol)) throw new Error('unsupported protocol');
  const host = u.hostname;
  if (host === 'localhost' || host.endsWith('.local')) throw new Error('blocked host');
  let addresses;
  try {
    addresses = await dns.lookup(host, { all: true });
  } catch {
    throw new Error('dns failed');
  }
  for (const a of addresses) {
    if (isPrivateIp(a.address)) throw new Error('private ip blocked');
  }
}

function isPrivateIp(ip) {
  if (net.isIP(ip) === 4) {
    const parts = ip.split('.').map(Number);
    if (parts[0] === 10) return true;
    if (parts[0] === 127) return true;
    if (parts[0] === 169 && parts[1] === 254) return true;
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    if (parts[0] === 192 && parts[1] === 168) return true;
    if (parts[0] === 0) return true;
  }
  if (net.isIP(ip) === 6) {
    const lower = ip.toLowerCase();
    if (lower === '::1' || lower.startsWith('fc') || lower.startsWith('fd') || lower.startsWith('fe80')) return true;
  }
  return false;
}

export function rateLimit(map, key, windowMs = 60_000, max = 30) {
  const now = Date.now();
  let entry = map.get(key);
  if (!entry || now - entry.start > windowMs) {
    entry = { start: now, count: 0 };
    map.set(key, entry);
  }
  entry.count += 1;
  return entry.count <= max;
}
