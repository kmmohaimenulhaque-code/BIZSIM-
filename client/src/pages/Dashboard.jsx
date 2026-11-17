import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCases } from '../lib/api.js';
import { useStore } from '../lib/store.js';

export default function Dashboard() {
  const [cases, setCases] = useState([]);
  const profile = useStore((s) => s.profile);

  useEffect(() => {
    getCases().then(setCases).catch(() => setCases([]));
  }, []);

  return (
    <div className="page">
      <header className="page-header">
        <h1>Dashboard</h1>
        <p className="muted">Local progress · {profile?.decisions || 0} decisions · {profile?.casesCompleted || 0} cases completed</p>
      </header>
      <section className="grid cards">
        {cases.map((c) => (
          <Link key={c.id} to={`/case/${c.id}`} className="card">
            <div className="card-kicker">{c.era} · {c.domain}</div>
            <h3>{c.title}</h3>
            <p className="muted">{c.summary}</p>
            <div className="card-meta">{c.decisionCount} decisions</div>
          </Link>
        ))}
      </section>
      <section className="row gap">
        <Link className="btn" to="/research">Research a live company</Link>
        <Link className="btn secondary" to="/explore">Explore library</Link>
      </section>
    </div>
  );
}
