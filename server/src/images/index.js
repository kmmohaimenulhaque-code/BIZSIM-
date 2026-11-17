// Images: openly licensed photos from Openverse (CC0 / CC BY etc.) and optional AI generation.

import { Router } from 'express';
import { config } from '../config.js';
import { fetchJson } from '../lib/http.js';

export function createImagesRouter() {
  const r = Router();

  r.get('/search', async (req, res) => {
    const q = String(req.query.q || '').trim();
    if (!q) return res.status(400).json({ error: 'q required' });
    try {
      const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&license_type=commercial&page_size=12`;
      const data = await fetchJson(url, { timeout: 10000 });
      const results = (data.results || []).map((img) => ({
        id: img.id,
        title: img.title,
        url: img.url,
        thumbnail: img.thumbnail,
        foreign_landing_url: img.foreign_landing_url,
        license: img.license,
        license_url: img.license_url,
        creator: img.creator,
        source: 'openverse',
      }));
      res.json({ results });
    } catch (e) {
      res.status(502).json({ error: e.message, results: [] });
    }
  });

  r.post('/generate', async (req, res) => {
    const prompt = String(req.body?.prompt || '').trim();
    if (!prompt) return res.status(400).json({ error: 'prompt required' });
    const provider = (config.images.provider || (config.llm.geminiKey ? 'gemini' : 'none')).toLowerCase();
    if (provider === 'none') {
      return res.status(501).json({ error: 'Image generation disabled. Set IMAGE_PROVIDER=gemini or openai.' });
    }
    try {
      if (provider === 'gemini' && config.llm.geminiKey) {
        const { resolveGeminiImageModel } = await import('../ai/geminiModels.js');
        const model = await resolveGeminiImageModel(config.llm.geminiKey, config.images.geminiImageModel);
        // Placeholder: actual image bytes would be returned by the image-capable endpoint.
        res.json({
          provider: 'gemini',
          model,
          note: 'AI-generated image',
          prompt,
          // Client should fall back to Openverse if no image URL is returned.
        });
        return;
      }
      res.status(501).json({ error: 'Provider not fully configured' });
    } catch (e) {
      res.status(502).json({ error: e.message });
    }
  });

  return r;
}
