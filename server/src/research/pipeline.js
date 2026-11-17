// The live research pipeline. Every stage reported to the user corresponds to a
// real operation below; sources are emitted only when they are actually retrieved.

import { Router } from 'express';
import { resolveEntity } from './wikidata.js';
import { fetchWikipedia, fetchSec, fetchNews, fetchWebsite } from './sources.js';
import { synthesizeCase } from '../ai/caseSynth.js';
import { rateLimit } from '../lib/http.js';

const limits = new Map();

export function createResearchRouter() {
  const r = Router();

  r.get('/stream', async (req, res) => {
    const q = String(req.query.q || '').trim();
    if (!q) return res.status(400).end('q required');
    if (!rateLimit(limits, req.ip || 'anon', 60_000, 20)) {
      return res.status(429).end('rate limit');
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    const send = (event, data) => {
      res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    };

    const dossier = { query: q, entity: null, wikipedia: null, sec: null, news: [], website: null };

    try {
      send('stage', { id: 'wikidata', label: 'Resolving entity' });
      dossier.entity = await resolveEntity(q);
      send('source', { stage: 'wikidata', data: dossier.entity });

      if (dossier.entity?.label) {
        send('stage', { id: 'wikipedia', label: 'Wikipedia summary' });
        try {
          dossier.wikipedia = await fetchWikipedia(dossier.entity.label);
          send('source', { stage: 'wikipedia', data: dossier.wikipedia });
        } catch (e) {
          send('failure', { stage: 'wikipedia', error: e.message });
        }

        send('stage', { id: 'sec', label: 'SEC EDGAR financials' });
        try {
          dossier.sec = await fetchSec(dossier.entity);
          send('source', { stage: 'sec', data: dossier.sec });
        } catch (e) {
          send('failure', { stage: 'sec', error: e.message });
        }

        send('stage', { id: 'news', label: 'Recent news' });
        try {
          dossier.news = await fetchNews(dossier.entity.label || q);
          send('source', { stage: 'news', data: dossier.news });
        } catch (e) {
          send('failure', { stage: 'news', error: e.message });
        }

        if (dossier.entity?.website || dossier.wikipedia?.url) {
          send('stage', { id: 'website', label: 'Official website' });
          try {
            dossier.website = await fetchWebsite(dossier.entity?.website || dossier.wikipedia?.url);
            send('source', { stage: 'website', data: dossier.website });
          } catch (e) {
            send('failure', { stage: 'website', error: e.message });
          }
        }
      }

      send('stage', { id: 'synth', label: 'Constructing the case' });
      try {
        const synthesized = await synthesizeCase(dossier);
        send('result', { case: synthesized });
      } catch (e) {
        send('failure', { stage: 'synth', error: e.message });
      }
    } catch (e) {
      send('failure', { stage: 'pipeline', error: e.message });
    }

    send('end', { ok: true });
    res.end();
  });

  r.post('/', async (req, res) => {
    const q = String(req.body?.q || '').trim();
    if (!q) return res.status(400).json({ error: 'q required' });
    // Non-streaming convenience: run same pipeline, return final dossier + case
    res.status(501).json({ error: 'Use GET /api/research/stream?q= for SSE' });
  });

  return r;
}
