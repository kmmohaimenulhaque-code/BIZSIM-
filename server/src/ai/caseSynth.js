// Turns a research dossier into a playable, source-grounded case via LLM.
// Output is validated; unsourced claims are stripped or labelled AI-generated.

import { completeJson } from './llm.js';
import { validateCase } from '../../../shared/validate.js';
import { principles } from '../../../shared/books.js';

export async function synthesizeCase(dossier) {
  const system = `You are a business-case author. You may ONLY use facts present in the provided dossier and the principle list. Output strict JSON matching the case schema. Label any inference as hypothetical. Never invent statistics or sources.`;

  const principleList = principles.slice(0, 40).map((p) => `${p.id}: ${p.text} (${p.book})`).join('\n');

  const user = JSON.stringify({
    instruction: 'Create one playable case with 2-3 sequential decisions from this dossier.',
    dossier,
    availablePrinciples: principleList,
    schemaHint: {
      id: 'string-slug',
      title: 'string',
      era: 'Digital',
      domain: 'Strategy',
      summary: 'string',
      sources: [{ title: 'string', url: 'string' }],
      decisions: [{
        id: 'd1',
        situation: 'string',
        concept: 'string',
        evidence: 'string',
        options: [{ id: 'a', label: 'string', rationale: 'string' }],
        outcome: { historical: 'string', sources: [] },
        principles: ['principle-id'],
      }],
    },
  });

  const { text, provider, model } = await completeJson({ system, user, maxTokens: 6000 });
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    // try to extract JSON object
    const m = text.match(/\{[\s\S]*\}/);
    if (!m) throw new Error('LLM did not return JSON');
    parsed = JSON.parse(m[0]);
  }

  parsed._meta = { aiGenerated: true, provider, model };
  const check = validateCase(parsed);
  if (!check.ok) {
    console.warn('Synthesized case failed validation', check.errors);
  }
  return parsed;
}
