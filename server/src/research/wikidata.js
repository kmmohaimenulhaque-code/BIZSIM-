import { fetchJson } from '../lib/http.js';

const API = 'https://www.wikidata.org/w/api.php';

// Properties we read, with labels and kinds.
const PROPS = {
  P31: 'instance of',
  P17: 'country',
  P159: 'headquarters',
  P112: 'founded by',
  P571: 'inception',
  P856: 'official website',
  P414: 'stock exchange',
  P452: 'industry',
};

export async function resolveEntity(query) {
  // Search
  const searchUrl = `${API}?action=wbsearchentities&search=${encodeURIComponent(query)}&language=en&limit=5&format=json&origin=*`;
  const search = await fetchJson(searchUrl, { timeout: 10000 });
  const hit = (search.search || [])[0];
  if (!hit) return null;

  const id = hit.id;
  const entUrl = `${API}?action=wbgetentities&ids=${id}&languages=en&props=labels|descriptions|claims|sitelinks&format=json&origin=*`;
  const ent = await fetchJson(entUrl, { timeout: 12000 });
  const entity = ent.entities?.[id];
  if (!entity) return null;

  const label = entity.labels?.en?.value || hit.label;
  const description = entity.descriptions?.en?.value || hit.description || '';
  const claims = entity.claims || {};

  const facts = {};
  for (const [pid, name] of Object.entries(PROPS)) {
    const arr = claims[pid];
    if (!arr?.length) continue;
    const vals = arr.slice(0, 5).map(extractValue).filter(Boolean);
    if (vals.length) facts[name] = vals.length === 1 ? vals[0] : vals;
  }

  let website = null;
  if (claims.P856?.[0]) {
    website = extractValue(claims.P856[0]);
  }

  const enwiki = entity.sitelinks?.enwiki?.title || null;

  return {
    id,
    label,
    description,
    facts,
    website,
    enwiki,
  };
}

function extractValue(claim) {
  const m = claim.mainsnak?.datavalue;
  if (!m) return null;
  if (m.type === 'string') return m.value;
  if (m.type === 'wikibase-entityid') return m.value?.id;
  if (m.type === 'time') return (m.value?.time || '').replace(/^\+/, '').slice(0, 10);
  if (m.type === 'monolingualtext') return m.value?.text;
  if (m.type === 'globecoordinate') return `${m.value?.latitude}, ${m.value?.longitude}`;
  return null;
}
