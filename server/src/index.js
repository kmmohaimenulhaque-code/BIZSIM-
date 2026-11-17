import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { config } from './config.js';
import { createResearchRouter } from './research/pipeline.js';
import { createImagesRouter } from './images/index.js';
import { cases } from '../../shared/cases/index.js';
import { books, principles } from '../../shared/books.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json({ limit: '1mb' }));

// CORS
app.use((req, res, next) => {
  const origins = config.corsOrigins;
  const origin = req.headers.origin;
  if (origins.includes('*') || (origin && origins.includes(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.get('/api/status', (req, res) => {
  res.json({
    ok: true,
    version: '1.0.1',
    llm: Boolean(config.llm.anthropicKey || config.llm.openaiKey || config.llm.geminiKey),
    images: config.images.provider || (config.llm.geminiKey ? 'gemini' : 'openverse'),
  });
});

app.get('/api/cases', (req, res) => {
  res.json(cases.map((c) => ({
    id: c.id,
    title: c.title,
    era: c.era,
    domain: c.domain,
    summary: c.summary,
    decisionCount: c.decisions?.length || 0,
  })));
});

app.get('/api/cases/:id', (req, res) => {
  const c = cases.find((x) => x.id === req.params.id);
  if (!c) return res.status(404).json({ error: 'not found' });
  res.json(c);
});

app.get('/api/library', (req, res) => {
  res.json({ books, principles });
});

app.use('/api/research', createResearchRouter());
app.use('/api/images', createImagesRouter());

// Static client
const clientDist = path.join(config.root, 'client', 'dist');
const clientPublic = path.join(config.root, 'client', 'public');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else if (fs.existsSync(clientPublic)) {
  app.use(express.static(clientPublic));
}

app.listen(config.port, () => {
  console.log(`BIZSIM server on http://localhost:${config.port}`);
});
