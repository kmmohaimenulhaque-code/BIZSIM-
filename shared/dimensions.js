/** 10 bipolar strategic-thinking dimensions used by the learning profile. */
export const dimensions = [
  { id: 'risk', left: 'Risk-averse', right: 'Risk-seeking' },
  { id: 'horizon', left: 'Short-term', right: 'Long-term' },
  { id: 'focus', left: 'Narrow focus', right: 'Broad portfolio' },
  { id: 'control', left: 'Centralized control', right: 'Distributed autonomy' },
  { id: 'innovation', left: 'Exploit existing', right: 'Explore new' },
  { id: 'stakeholder', left: 'Shareholder-first', right: 'Multi-stakeholder' },
  { id: 'data', left: 'Intuition-led', right: 'Data-led' },
  { id: 'speed', left: 'Deliberate', right: 'Fast iteration' },
  { id: 'competition', left: 'Collaborate', right: 'Compete hard' },
  { id: 'ethics', left: 'Rules-first', right: 'Outcomes-first' },
];

export const domains = [
  'Strategy', 'Finance', 'Operations', 'Product', 'Marketing',
  'People', 'Technology', 'Regulation', 'Geopolitics', 'Culture',
];

export const eras = [
  'Ancient', 'Early modern', 'Industrial', '20th century', 'Digital',
];

/** Canonical 6-step case method. */
export const methodSteps = [
  'Situation',
  'Concept',
  'Evidence',
  'Decision',
  'Outcome',
  'Insight',
];
