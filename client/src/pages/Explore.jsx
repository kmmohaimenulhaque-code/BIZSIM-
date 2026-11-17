import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCases } from '../lib/api.js';

export default function Explore() {
  const [cases, setCases] = useState([]);
  const [q, setQ] = useState('');
  useEffect(() => { getCases().then(setCases).catch(() => {}); }, []);
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return cases;
    return cases.filter((c) =>
      [c.title, c.summary, c.era, c.domain].join(' ').toLowerCase().includes(s),
    );
  }, [cases, q]);
  return (
    <div className="page">
      <header className="page-header">
        <h1>Explore</h1>
        <input className="input" placeholder="Filter cases…" value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      <div className="list">
        {filtered.map((c) => (
          <Link key={c.id} to={`/case/${c.id}`} className="list-item">
            <strong>{c.title}</strong>
            <span className="muted">{c.era} · {c.domain}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
