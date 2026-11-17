// Provider-agnostic JSON completion. Supports Anthropic, OpenAI-compatible
// endpoints, and Gemini. Returns { text, provider, model } or throws.

import { config } from '../config.js';

export async function completeJson({ system, user, maxTokens = 4096 }) {
  const order = pickProviders();
  let lastErr;
  for (const p of order) {
    try {
      if (p === 'anthropic') return await callAnthropic({ system, user, maxTokens });
      if (p === 'openai') return await callOpenAI({ system, user, maxTokens });
      if (p === 'gemini') return await callGemini({ system, user, maxTokens });
    } catch (e) {
      lastErr = e;
      console.warn(`[llm] ${p} failed:`, e.message);
    }
  }
  throw lastErr || new Error('No LLM provider configured');
}

function pickProviders() {
  const forced = (config.llm.provider || '').toLowerCase();
  if (forced === 'none') return [];
  if (forced === 'anthropic' && config.llm.anthropicKey) return ['anthropic'];
  if (forced === 'openai' && config.llm.openaiKey) return ['openai'];
  if (forced === 'gemini' && config.llm.geminiKey) return ['gemini'];
  const out = [];
  if (config.llm.anthropicKey) out.push('anthropic');
  if (config.llm.openaiKey) out.push('openai');
  if (config.llm.geminiKey) out.push('gemini');
  return out;
}

async function callAnthropic({ system, user, maxTokens }) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': config.llm.anthropicKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: config.llm.anthropicModel,
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = data.content?.map((c) => c.text || '').join('') || '';
  return { text, provider: 'anthropic', model: config.llm.anthropicModel };
}

async function callOpenAI({ system, user, maxTokens }) {
  const base = config.llm.openaiBaseUrl.replace(/\/$/, '');
  const res = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${config.llm.openaiKey}`,
    },
    body: JSON.stringify({
      model: config.llm.openaiModel,
      max_tokens: maxTokens,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      response_format: { type: 'json_object' },
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || '';
  return { text, provider: 'openai', model: config.llm.openaiModel };
}

async function callGemini({ system, user, maxTokens }) {
  const { resolveGeminiModel } = await import('./geminiModels.js');
  const model = await resolveGeminiModel(config.llm.geminiKey, config.llm.geminiModel);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.llm.geminiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: system }] },
      contents: [{ role: 'user', parts: [{ text: user }] }],
      generationConfig: { maxOutputTokens: maxTokens, responseMimeType: 'application/json' },
    }),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') || '';
  return { text, provider: 'gemini', model };
}
