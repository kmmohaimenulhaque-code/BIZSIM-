export function Provenance({ kind }) {
  const map = {
    verified: 'Verified fact',
    source: 'Source reference',
    ai: 'AI-generated analysis',
    hypo: 'Hypothetical scenario',
  };
  return <span className={`prov prov-${kind}`}>{map[kind] || kind}</span>;
}

export function SourceList({ sources = [] }) {
  if (!sources.length) return null;
  return (
    <ul className="sources">
      {sources.map((s, i) => (
        <li key={s.id || i}>
          {s.url ? <a href={s.url} target="_blank" rel="noreferrer">{s.title || s.url}</a> : (s.title || s)}
        </li>
      ))}
    </ul>
  );
}
