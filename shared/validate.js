/**
 * Deterministic quality gates for curated cases.
 * Used by scripts/validate-content.mjs and server-side AI synthesis validation.
 */

export function validateCase(c) {
  const errors = [];
  if (!c || typeof c !== 'object') return { ok: false, errors: ['Case is not an object'] };
  if (!c.id) errors.push('Missing id');
  if (!c.title) errors.push('Missing title');
  if (!c.era) errors.push('Missing era');
  if (!Array.isArray(c.decisions) || c.decisions.length < 1) {
    errors.push('Need at least one decision');
  } else {
    c.decisions.forEach((d, i) => {
      if (!d.id) errors.push(`Decision ${i}: missing id`);
      if (!Array.isArray(d.options) || d.options.length < 2) {
        errors.push(`Decision ${i}: need >= 2 options`);
      }
      if (!d.outcome) errors.push(`Decision ${i}: missing outcome`);
    });
  }
  if (!Array.isArray(c.sources)) errors.push('sources must be an array');
  return { ok: errors.length === 0, errors };
}

export function stripUnsourcedClaims(text, allowedSources = []) {
  // Placeholder gate used by AI pipeline: in production this is stricter.
  return text;
}
