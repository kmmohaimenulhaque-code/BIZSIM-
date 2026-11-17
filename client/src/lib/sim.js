// Simulation engine: runs, decisions, company meters and the learner profile.
// Pure functions + thin store actions, independent of presentation.
import { setState, getState, uid } from './store.js';

export function startRun(caseId) {
  const id = uid('run');
  setState((s) => ({
    runs: {
      ...s.runs,
      [id]: {
        id,
        caseId,
        startedAt: Date.now(),
        decisions: [],
        meters: { position: 0, finance: 0, resilience: 0 },
        completed: false,
      },
    },
  }));
  return id;
}

export function commitDecision(runId, decisionId, optionId, meta = {}) {
  setState((s) => {
    const run = s.runs[runId];
    if (!run) return s;
    const decisions = [...run.decisions, { decisionId, optionId, at: Date.now(), ...meta }];
    const meters = { ...run.meters };
    if (meta.impact) {
      for (const k of ['position', 'finance', 'resilience']) {
        meters[k] = (meters[k] || 0) + (meta.impact[k] || 0);
      }
    }
    const profile = { ...s.profile, decisions: (s.profile.decisions || 0) + 1 };
    if (meta.dimensionDeltas) {
      const dims = { ...(profile.dimensions || {}) };
      for (const [k, v] of Object.entries(meta.dimensionDeltas)) {
        const prev = dims[k] || 0;
        dims[k] = prev * 0.85 + v * 0.15; // EWMA
      }
      profile.dimensions = dims;
    }
    return {
      runs: { ...s.runs, [runId]: { ...run, decisions, meters } },
      profile,
    };
  });
}

export function completeRun(runId) {
  setState((s) => {
    const run = s.runs[runId];
    if (!run || run.completed) return s;
    return {
      runs: { ...s.runs, [runId]: { ...run, completed: true, completedAt: Date.now() } },
      profile: {
        ...s.profile,
        casesCompleted: (s.profile.casesCompleted || 0) + 1,
      },
    };
  });
}

export function getRun(runId) {
  return getState().runs[runId] || null;
}
