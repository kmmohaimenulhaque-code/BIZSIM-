// Industrial and modern historical cases.

export const ford = {
  id: 'ford-model-t',
  title: 'One car for everyone',
  era: 'Industrial',
  domain: 'Operations',
  summary: 'Ford must decide how far to push standardization and vertical integration for the Model T.',
  sources: [{ title: 'Ford, My Life and Work', url: 'https://www.gutenberg.org/ebooks/7213' }],
  decisions: [{
    id: 'd1',
    situation: 'Demand is rising; the plant is chaotic with many models and options.',
    concept: 'Scale through radical standardization.',
    evidence: 'Competitors offer variety; costs remain high.',
    options: [
      { id: 'a', label: 'Keep multi-model variety' },
      { id: 'b', label: 'Single model, any color as long as it is black' },
      { id: 'c', label: 'Outsource major components' },
    ],
    outcome: {
      historical: 'Ford standardized on the Model T and built the moving assembly line, cutting costs and expanding volume.',
      sources: [],
    },
    principles: ['p-strategy-2', 'p-helmer-1'],
  }],
};

export const intel = {
  id: 'intel-memory-to-micro',
  title: 'Memory to microprocessors',
  era: '20th century',
  domain: 'Strategy',
  summary: 'Intel faces Japanese competition in DRAM and must choose where to focus.',
  sources: [{ title: 'Grove, Only the Paranoid Survive', url: 'https://www.intel.com' }],
  decisions: [{
    id: 'd1',
    situation: 'DRAM margins are collapsing under Japanese scale competition.',
    concept: 'Strategic inflection: exit a core market.',
    evidence: 'Microprocessors show better margins and design wins.',
    options: [
      { id: 'a', label: 'Double down on DRAM with more investment' },
      { id: 'b', label: 'Exit DRAM and focus on microprocessors' },
      { id: 'c', label: 'Split the company into two pure-plays' },
    ],
    outcome: {
      historical: 'Intel exited DRAM and became the dominant microprocessor company.',
      sources: [],
    },
    principles: ['p-grove-1', 'p-strategy-1'],
  }],
};

export const apple1997 = {
  id: 'apple-1997',
  title: 'Apple 1997',
  era: 'Digital',
  domain: 'Strategy',
  summary: 'Apple is near bankruptcy; Jobs returns and must cut and focus.',
  sources: [{ title: 'Apple history / contemporaneous coverage', url: 'https://www.apple.com' }],
  decisions: [{
    id: 'd1',
    situation: 'Dozens of products, unclear messaging, cash pressure.',
    concept: 'Focus and product line simplification.',
    evidence: 'Microsoft investment offers a lifeline; retail and design are weak.',
    options: [
      { id: 'a', label: 'Keep broad product line to chase every segment' },
      { id: 'b', label: 'Cut to a simple matrix of products and bet on design' },
      { id: 'c', label: 'License Mac OS widely' },
    ],
    outcome: {
      historical: 'Jobs simplified the product matrix, ended clone licensing, and set up the path to iMac and later retail.',
      sources: [],
    },
    principles: ['p-strategy-2', 'p-thiel-1'],
  }],
};

export const kodak = {
  id: 'kodak-digital',
  title: 'Kodak and digital',
  era: 'Digital',
  domain: 'Innovation',
  summary: 'Kodak invents the digital camera but must protect the film business.',
  sources: [{ title: 'Christensen / Kodak case literature', url: 'https://www.kodak.com' }],
  decisions: [{
    id: 'd1',
    situation: 'Digital imaging is emerging; film still funds the company.',
    concept: 'Disruptive innovation and the innovator dilemma.',
    evidence: 'Internal digital projects exist; film margins are excellent.',
    options: [
      { id: 'a', label: 'Slow digital to protect film' },
      { id: 'b', label: 'Create a separate digital unit with its own P&L' },
      { id: 'c', label: 'Exit film early and go all-in on digital' },
    ],
    outcome: {
      historical: 'Kodak delayed aggressive digital transition; the film business collapsed later and the company entered bankruptcy in 2012.',
      sources: [],
    },
    principles: ['p-dilemma-1', 'p-grove-1'],
  }],
};

export const nokia = {
  id: 'nokia-smartphone',
  title: 'Nokia and the smartphone',
  era: 'Digital',
  domain: 'Product',
  summary: 'Nokia dominates feature phones as the iPhone and Android rise.',
  sources: [{ title: 'Nokia archive / industry reports', url: 'https://www.nokia.com' }],
  decisions: [{
    id: 'd1',
    situation: 'Symbian is aging; app ecosystems are becoming decisive.',
    concept: 'Platform shift and ecosystem lock-in.',
    evidence: 'iPhone and Android are gaining developers and users rapidly.',
    options: [
      { id: 'a', label: 'Double down on Symbian' },
      { id: 'b', label: 'Adopt Windows Phone as primary OS' },
      { id: 'c', label: 'Build a full Android portfolio immediately' },
    ],
    outcome: {
      historical: 'Nokia partnered with Microsoft on Windows Phone; the bet failed to restore leadership and the handset business was sold.',
      sources: [],
    },
    principles: ['p-helmer-1', 'p-dilemma-1'],
  }],
};

export const netflix = {
  id: 'netflix-2011',
  title: 'Netflix 2011',
  era: 'Digital',
  domain: 'Strategy',
  summary: 'Netflix considers splitting DVD and streaming and raising prices.',
  sources: [{ title: 'Netflix investor letters 2011', url: 'https://www.netflix.com' }],
  decisions: [{
    id: 'd1',
    situation: 'Streaming growth is strong; DVD is still profitable but declining.',
    concept: 'Managing transition pricing and brand trust.',
    evidence: 'Customers react badly to sudden price and product unbundling.',
    options: [
      { id: 'a', label: 'Keep one plan, raise prices modestly' },
      { id: 'b', label: 'Split into two companies/brands (Qwikster path)' },
      { id: 'c', label: 'Kill DVD immediately' },
    ],
    outcome: {
      historical: 'The Qwikster split was announced and then reversed after a subscriber and PR backlash; Netflix later dominated streaming.',
      sources: [],
    },
    principles: ['p-strategy-1', 'p-housel-1'],
  }],
};

export const modernCases = [ford, intel, apple1997, kodak, nokia, netflix];
