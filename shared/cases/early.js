// Historical cases: antiquity to the early modern period.
// Pre-decision text (situation, concept, evidence, checkpoint context) is written
// to avoid revealing outcomes. Outcomes cite sources listed in each case.
// impact = BIZSIM analytical model (position, finance, resilience deltas).
// quality = process quality of the decision given the information available at the time.

export const athens = {
  id: 'athens-silver-fleet',
  title: 'Silver for ships',
  era: 'Ancient',
  domain: 'Strategy',
  summary: 'Athens discovers a major silver vein at Laurium. How should the city use the windfall?',
  sources: [
    { id: 'hdt-7144', title: 'Herodotus, Histories 7.144', publisher: 'Perseus', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Hdt.+7.144', type: 'Primary' },
    { id: 'plut-them4', title: 'Plutarch, Life of Themistocles 4', publisher: 'Perseus', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Plut.+Them.+4', type: 'Primary' },
  ],
  decisions: [
    {
      id: 'd1',
      situation: 'A rich silver strike at Laurium yields a large surplus for the Athenian state.',
      concept: 'Strategic resource allocation under existential threat.',
      evidence: 'Persia is expanding west. Some citizens propose equal cash distributions; others urge naval investment.',
      checkpoint: 'What is the highest-leverage use of a one-time resource when a larger rival is mobilizing?',
      options: [
        { id: 'a', label: 'Distribute the silver equally among citizens', rationale: 'Immediate welfare and political popularity.' },
        { id: 'b', label: 'Build a large fleet of triremes', rationale: 'Invest in naval power before a Persian return.' },
        { id: 'c', label: 'Hold the silver in reserve', rationale: 'Preserve optionality until the threat is clearer.' },
      ],
      outcome: {
        historical: 'Athens, persuaded by Themistocles, built a fleet. The ships were decisive at Salamis (480 BC).',
        sources: ['hdt-7144', 'plut-them4'],
        impact: { position: 2, finance: -1, resilience: 2 },
        quality: { 'a': 1, 'b': 3, 'c': 2 },
      },
      principles: ['p-strategy-2', 'p-grove-1'],
    },
  ],
};

export const augustus = {
  id: 'augustus-military-treasury',
  title: 'Paying the legions',
  era: 'Ancient',
  domain: 'Finance',
  summary: 'Augustus must fund veteran pensions without destabilizing the state.',
  sources: [
    { id: 'res-gestae', title: 'Res Gestae Divi Augusti', publisher: 'LacusCurtius', url: 'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Augustus/Res_Gestae/home.html', type: 'Primary' },
  ],
  decisions: [
    {
      id: 'd1',
      situation: 'Discharged veterans expect land or cash. The treasury is strained after civil wars.',
      concept: 'Institutionalizing military compensation.',
      evidence: 'Ad-hoc land seizures and special taxes have caused unrest. A permanent fund is proposed.',
      checkpoint: 'How do you convert a recurring political obligation into a sustainable fiscal institution?',
      options: [
        { id: 'a', label: 'Continue ad-hoc land grants from conquered territory' },
        { id: 'b', label: 'Create a dedicated military treasury funded by new taxes' },
        { id: 'c', label: 'Reduce army size sharply to cut pension obligations' },
      ],
      outcome: {
        historical: 'Augustus established the aerarium militare (AD 6), funded by sales and inheritance taxes, to pay veterans systematically.',
        sources: ['res-gestae'],
        impact: { position: 1, finance: 1, resilience: 2 },
        quality: { 'a': 1, 'b': 3, 'c': 1 },
      },
      principles: ['p-strategy-1', 'p-dalio-1'],
    },
  ],
};

export const medici = {
  id: 'medici-bank',
  title: 'The Medici bank',
  era: 'Early modern',
  domain: 'Finance',
  summary: 'The Medici face the tension between papal business, branch autonomy, and risk.',
  sources: [
    { id: 'de-roover', title: 'The Rise and Decline of the Medici Bank', publisher: 'Oxford / JSTOR', url: 'https://www.jstor.org/stable/j.ctt1cc2k7s', type: 'Secondary' },
  ],
  decisions: [
    {
      id: 'd1',
      situation: 'Papal accounts bring prestige and volume but political exposure.',
      concept: 'Concentration risk versus relationship banking.',
      evidence: 'Branches operate with local partners; information lags are weeks.',
      checkpoint: 'When does prestige concentration become existential risk?',
      options: [
        { id: 'a', label: 'Deepen exclusive papal banking relationships' },
        { id: 'b', label: 'Diversify clients and tighten branch risk limits' },
        { id: 'c', label: 'Exit high-risk foreign branches' },
      ],
      outcome: {
        historical: 'The bank grew with papal and European business, then declined amid branch losses, political shocks, and weaker controls in later generations.',
        sources: ['de-roover'],
        impact: { position: 1, finance: 0, resilience: -1 },
        quality: { 'a': 2, 'b': 3, 'c': 2 },
      },
      principles: ['p-helmer-1', 'p-strategy-1'],
    },
  ],
};

export const voc = {
  id: 'voc-dutch-east-india',
  title: 'Dutch East India Company',
  era: 'Early modern',
  domain: 'Strategy',
  summary: 'The VOC experiments with permanent capital, monopoly charters, and Asian trade.',
  sources: [
    { id: 'gelderblom', title: 'The Formative Years of the Modern Corporation: The Dutch East India Company VOC, 1602–1623', publisher: 'Journal of Economic History', url: 'https://doi.org/10.1017/S0022050713000944', type: 'Secondary' },
    { id: 'wiki-voc', title: 'Dutch East India Company', publisher: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Dutch_East_India_Company', type: 'Reference' },
    { id: 'wiki-ams-exchange', title: 'Amsterdam Stock Exchange', publisher: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Amsterdam_Stock_Exchange', type: 'Reference' },
  ],
  decisions: [
    {
      id: 'd1',
      situation: 'Voyages are multi-year; investors want liquidity; the charter grants monopoly rights.',
      concept: 'Permanent capital and limited liability for long-horizon trade.',
      evidence: 'Earlier companies liquidated after each voyage, destroying going-concern value.',
      checkpoint: 'What capital structure matches a multi-year monopoly infrastructure business?',
      options: [
        { id: 'a', label: 'Keep voyage-by-voyage liquidation' },
        { id: 'b', label: 'Create permanent capital with tradable shares' },
        { id: 'c', label: 'State-run monopoly without private shares' },
      ],
      outcome: {
        historical: 'The VOC established permanent capital and a secondary market in shares, enabling long-term Asian infrastructure and monopoly enforcement.',
        sources: ['gelderblom', 'wiki-voc', 'wiki-ams-exchange'],
        impact: { position: 2, finance: 2, resilience: 1 },
        quality: { 'a': 1, 'b': 3, 'c': 1 },
      },
      principles: ['p-helmer-1', 'p-thiel-1'],
    },
  ],
};

export const earlyCases = [athens, augustus, medici, voc];
