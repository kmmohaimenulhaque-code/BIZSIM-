// Principles library. Every idea is paraphrased in BIZSIM's own words and
// attributed to the book it comes from. No passages are reproduced.
// Cases and AI-generated analysis may only cite principles that appear here.

export const books = [
  { id: '48-laws', title: 'The 48 Laws of Power', author: 'Robert Greene' },
  { id: 'influence', title: 'Influence', author: 'Robert Cialdini' },
  { id: 'prince', title: 'The Prince', author: 'Niccolò Machiavelli' },
  { id: 'good-strategy', title: 'Good Strategy Bad Strategy', author: 'Richard Rumelt' },
  { id: 'competitive-strategy', title: 'Competitive Strategy', author: 'Michael Porter' },
  { id: 'blue-ocean', title: 'Blue Ocean Strategy', author: 'Kim & Mauborgne' },
  { id: 'innovators-dilemma', title: "The Innovator's Dilemma", author: 'Clayton Christensen' },
  { id: 'art-of-war', title: 'The Art of War', author: 'Sun Tzu' },
  { id: 'good-to-great', title: 'Good to Great', author: 'Jim Collins' },
  { id: 'psychology-of-money', title: 'The Psychology of Money', author: 'Morgan Housel' },
  { id: 'principles', title: 'Principles', author: 'Ray Dalio' },
  { id: 'zero-to-one', title: 'Zero to One', author: 'Peter Thiel' },
  { id: 'only-paranoid', title: 'Only the Paranoid Survive', author: 'Andrew Grove' },
  { id: '7-powers', title: '7 Powers', author: 'Hamilton Helmer' },
];

/** @type {{ id: string, book: string, text: string }[]} */
export const principles = [
  { id: 'p-power-1', book: '48-laws', text: 'Never outshine the master; make those above you feel superior.' },
  { id: 'p-power-2', book: '48-laws', text: 'Conceal your intentions; keep people off-balance by hiding your purpose.' },
  { id: 'p-influence-1', book: 'influence', text: 'Reciprocity: people feel obliged to return favors and concessions.' },
  { id: 'p-influence-2', book: 'influence', text: 'Social proof: people look to what others do when uncertain.' },
  { id: 'p-strategy-1', book: 'good-strategy', text: 'A good strategy is a coherent response to a critical challenge, not a list of goals.' },
  { id: 'p-strategy-2', book: 'good-strategy', text: 'Focus resources on the pivotal point where they can make a decisive difference.' },
  { id: 'p-porter-1', book: 'competitive-strategy', text: 'Position against the five forces; avoid competing on the same dimensions as rivals.' },
  { id: 'p-blue-1', book: 'blue-ocean', text: 'Create uncontested market space instead of fighting over existing demand.' },
  { id: 'p-dilemma-1', book: 'innovators-dilemma', text: 'Listening only to current customers can cause you to miss disruptive technologies.' },
  { id: 'p-sun-1', book: 'art-of-war', text: 'Know the enemy and know yourself; in a hundred battles you will not be in peril.' },
  { id: 'p-collins-1', book: 'good-to-great', text: 'Get the right people on the bus before deciding where to drive it.' },
  { id: 'p-housel-1', book: 'psychology-of-money', text: 'Getting wealth and keeping wealth require different skills; survival matters more than returns.' },
  { id: 'p-dalio-1', book: 'principles', text: 'Radical transparency and thoughtful disagreement improve decisions.' },
  { id: 'p-thiel-1', book: 'zero-to-one', text: 'Create a monopoly by doing something unique; competition is for losers.' },
  { id: 'p-grove-1', book: 'only-paranoid', text: 'Strategic inflection points require acting before the evidence is overwhelming.' },
  { id: 'p-helmer-1', book: '7-powers', text: 'Durable returns come from power: scale economies, network effects, counter-positioning, switching costs, branding, cornered resource, process power.' },
];

export default { books, principles };
