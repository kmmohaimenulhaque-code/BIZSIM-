import { earlyCases } from './early.js';
import { modernCases } from './modern.js';

/** @type {import('../validate.js').Case[]} */
export const cases = [...earlyCases, ...modernCases];

export function getCase(id) {
  return cases.find((c) => c.id === id) || null;
}

export default cases;
