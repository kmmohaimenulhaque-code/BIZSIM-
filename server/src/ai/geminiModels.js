// Picks a working Gemini model automatically. Google retires model ids often,
// so we list models the key can use and prefer the newest stable flash model.

const cache = new Map();

export async function resolveGeminiModel(apiKey, pinned = '') {
  if (pinned) return pinned;
  if (cache.has(apiKey)) return cache.get(apiKey);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
  );
  if (!res.ok) throw new Error(`Gemini models list ${res.status}`);
  const data = await res.json();
  const names = (data.models || [])
    .map((m) => (m.name || '').replace(/^models\//, ''))
    .filter((n) => n.includes('flash') && !n.includes('exp') && !n.includes('preview'));

  // Prefer newest-looking flash models
  const preferred = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
  ];
  let chosen = preferred.find((p) => names.includes(p)) || names[0];
  if (!chosen) chosen = 'gemini-1.5-flash';
  cache.set(apiKey, chosen);
  return chosen;
}

export async function resolveGeminiImageModel(apiKey, pinned = '') {
  if (pinned) return pinned;
  const key = apiKey + ':image';
  if (cache.has(key)) return cache.get(key);
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
  );
  if (!res.ok) return 'gemini-2.0-flash-preview-image-generation';
  const data = await res.json();
  const names = (data.models || [])
    .map((m) => (m.name || '').replace(/^models\//, ''))
    .filter((n) => n.includes('image') || n.includes('flash-image'));
  const chosen = names.find((n) => n.includes('flash')) || names[0] || 'gemini-2.0-flash-preview-image-generation';
  cache.set(key, chosen);
  return chosen;
}
