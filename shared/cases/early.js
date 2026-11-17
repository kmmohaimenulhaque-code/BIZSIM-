// Historical cases: antiquity to the early modern period.
// Pre-decision text (situation, concept, evidence, checkpoints) is written to avoid spoilers.
// Outcomes and sources are shown only after the learner commits.

export const athens = {
  id: 'athens-silver-fleet',
  title: 'Silver for ships',
  era: 'Ancient',
  domain: 'Strategy',
  summary: 'Athens discovers a major silver vein at Laurium. How should the city use the windfall?',
  sources: [
    { title: 'Herodotus, Histories',
      url: 'https://www.perseus.tufts.edu/hopper/text?doc=Hdt.+7.144' },
    { title: 'Plutarch, Life of Themistocles',
      url: 'https://www.perseus.tufts.edu/hopper/text?doc=Plut.+Them.+4' },
  ],
  decisions: [
    {
      id: 'd1',
      situation: 'A rich silver strike at Laurium yields a large surplus for the Athenian state.',
      concept: 'Strategic resource allocation under existential threat.',
      evidence: 'Persia is expanding west. Some citizens propose equal cash distributions; others urge naval investment.',
      options: [
        { id: 'a', label: 'Distribute the silver equally among citizens',
          rationale: 'Immediate welfare and political popularity.' },
        { id: 'b', label: 'Build a large fleet of triremes',
          rationale: 'Invest in naval power before a Persian return.' },
        { id: 'c', label: 'Hold the silver in reserve',
          rationale: 'Preserve optionality until the threat is clearer.' },
      ],
      outcome: {
        historical: 'Athens, persuaded by Themistocles, built a fleet. The ships were decisive at Salamis (480 BC).',
        sources: [{ title: 'Herodotus 7.144', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Hdt.+7.144' }],
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
    { title: 'Res Gestae Divi Augusti',
      url: 'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Augustus/Res_Gestae/home.html' },
  ],
  decisions: [
    {
      id: 'd1',
      situation: 'Discharged veterans expect land or cash. The treasury is strained after civil wars.',
      concept: 'Institutionalizing military compensation.',
      evidence: 'Ad-hoc land seizures and special taxes have caused unrest. A permanent fund is proposed.',
      options: [
        { id: 'a', label: 'Continue ad-hoc land grants from conquered territory' },
        { id: 'b', label: 'Create a dedicated military treasury funded by new taxes' },
        { id: 'c', label: 'Reduce army size sharply to cut pension obligations' },
      ],
      outcome: {
        historical: 'Augustus established the aerarium militare (AD 6), funded by sales and inheritance taxes, to pay veterans systematically.',
        sources: [{ title: 'Res Gestae', url: 'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Augustus/Res_Gestae/home.html' }],
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
    { title: 'de Roover, The Rise and Decline of the Medici Bank',
      url: 'https://www.jstor.org/stable/j.ctt1cc2k7s' },
  ],
  decisions: [
    {
      id: 'd1',
      situation: 'Papal accounts bring prestige and volume but political exposure.',
      concept: 'Concentration risk versus relationship banking.',
      evidence: 'Branches operate with local partners; information lags are weeks.',
      options: [
        { id: 'a', label: 'Deepen exclusive papal banking relationships' },
        { id: 'b', label: 'Diversify clients and tighten branch risk limits' },
        { id: 'c', label: 'Exit high-risk foreign branches' },
      ],
      outcome: {
        historical: 'The bank grew with papal and European business, then declined amid branch losses, political shocks, and weaker controls in later generations.',
        sources: [{ title: 'de Roover', url: 'https://www.jstor.org/stable/j.ctt1cc2k7s' }],
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
    { title: 'Gelderblom et al. on VOC capital',
      url: 'https://doi.org/10.1017/S0022050713000944' },
  ],
  decisions: [
    {
      id: 'd1',
      situation: 'Voyages are multi-year; investors want liquidity; the charter grants monopoly rights.',
      concept: 'Permanent capital and limited liability for long-horizon trade.',
      evidence: 'Earlier companies liquidated after each voyage, destroying going-concern value.',
      options: [
        { id: 'a', label: 'Keep voyage-by-voyage liquidation' },
        { id: 'b', label: 'Create permanent capital with tradable shares' },
        { id: 'c', label: 'State-run monopoly without private shares' },
      ],
      outcome: {
        historical: 'The VOC established permanent capital and a secondary market in shares, enabling long-term Asian infrastructure and monopoly enforcement.',
        sources: [{ title: 'Gelderblom et al.', url: 'https://doi.org/10.1017/S0022050713000944' }],
      },
      principles: ['p-helmer-1', 'p-thiel-1'],
    },
  ],
};

export const earlyCases = [athens, augustus, medici, voc];
