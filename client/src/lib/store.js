// Zero-login, local-first state. Everything the learner does is stored on this
// device only. Progress can be exported to a file and imported elsewhere.
import { useSyncExternalStore } from 'react';

const KEY = 'bizsim-v1';

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    version: 1,
    runs: {},
    profile: { dimensions: {}, decisions: 0, casesCompleted: 0 },
    settings: { theme: 'dark' },
  };
}

let state = load();
const listeners = new Set();

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

export function getState() {
  return state;
}

export function setState(partial) {
  state = { ...state, ...(typeof partial === 'function' ? partial(state) : partial) };
  persist();
  listeners.forEach((l) => l());
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useStore(selector = (s) => s) {
  return useSyncExternalStore(subscribe, () => selector(state), () => selector(state));
}

export function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function exportProgress() {
  return JSON.stringify(state, null, 2);
}

export function importProgress(json) {
  const data = typeof json === 'string' ? JSON.parse(json) : json;
  if (!data || data.version !== 1) throw new Error('Unsupported progress file');
  state = data;
  persist();
  listeners.forEach((l) => l());
}
