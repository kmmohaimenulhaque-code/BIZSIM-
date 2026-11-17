import { useState } from 'react';
import { researchStream } from '../lib/api.js';

export default function Research() {
  const [q, setQ] = useState('');
  const [log, setLog] = useState([]);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  function run(e) {
    e.preventDefault();
    if (!q.trim() || busy) return;
    setBusy(true);
    setLog([]);
    setResult(null);
    const stop = researchStream(q.trim(), {
      onStage: (d) => setLog((L) => [...L, { type: 'stage', ...d }]),
      onSource: (d) => setLog((L) => [...L, { type: 'source', ...d }]),
      onFailure: (d) => setLog((L) => [...L, { type: 'failure', ...d }]),
      onResult: (d) => setResult(d.case || d),
      onEnd: () => setBusy(false),
    });
    return () => stop();
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Live company research</h1>
        <p className="muted">Wikidata → Wikipedia → SEC EDGAR → news → website → optional AI case</p>
      </header>
      <form className="row gap" onSubmit={run}>
        <input className="input grow" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Company name or ticker" />
        <button className="btn" disabled={busy}>{busy ? 'Running…' : 'Research'}</button>
      </form>
      <div className="log">
        {log.map((item, i) => (
          <div key={i} className={`log-item ${item.type}`}>
            <strong>{item.type}</strong> {item.label || item.stage || ''} {item.error || ''}
          </div>
        ))}
      </div>
      {result && (
        <section className="card">
          <h2>{result.title || 'Synthesized case'}</h2>
          <p>{result.summary}</p>
          <pre className="code">{JSON.stringify(result, null, 2)}</pre>
        </section>
      )}
    </div>
  );
}
