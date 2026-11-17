const BASE = '';

export async function getStatus() {
  const r = await fetch(`${BASE}/api/status`);
  if (!r.ok) throw new Error('status failed');
  return r.json();
}

export async function getCases() {
  const r = await fetch(`${BASE}/api/cases`);
  if (!r.ok) throw new Error('cases failed');
  return r.json();
}

export async function getCase(id) {
  const r = await fetch(`${BASE}/api/cases/${encodeURIComponent(id)}`);
  if (!r.ok) throw new Error('case failed');
  return r.json();
}

export async function getLibrary() {
  const r = await fetch(`${BASE}/api/library`);
  if (!r.ok) throw new Error('library failed');
  return r.json();
}

export function researchStream(q, { onStage, onSource, onResult, onFailure, onEnd } = {}) {
  const es = new EventSource(`${BASE}/api/research/stream?q=${encodeURIComponent(q)}`);
  es.addEventListener('stage', (e) => onStage?.(JSON.parse(e.data)));
  es.addEventListener('source', (e) => onSource?.(JSON.parse(e.data)));
  es.addEventListener('result', (e) => onResult?.(JSON.parse(e.data)));
  es.addEventListener('failure', (e) => onFailure?.(JSON.parse(e.data)));
  es.addEventListener('end', (e) => {
    onEnd?.(JSON.parse(e.data));
    es.close();
  });
  es.onerror = () => {
    onFailure?.({ stage: 'connection', error: 'stream error' });
    es.close();
  };
  return () => es.close();
}
