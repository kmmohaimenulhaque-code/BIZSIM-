import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCase } from '../lib/api.js';
import { startRun, commitDecision, completeRun } from '../lib/sim.js';

export default function CasePlayer() {
  const { id } = useParams();
  const [c, setC] = useState(null);
  const [runId, setRunId] = useState(null);
  const [step, setStep] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    getCase(id).then((data) => {
      setC(data);
      setRunId(startRun(data.id));
      setStep(0);
      setChosen(null);
      setRevealed(false);
    }).catch(() => setC(null));
  }, [id]);

  if (!c) return <div className="page"><p>Loading case…</p></div>;
  const d = c.decisions?.[step];
  if (!d) return <div className="page"><p>Case complete.</p></div>;

  function pick(optId) {
    setChosen(optId);
    setRevealed(true);
    commitDecision(runId, d.id, optId, {
      impact: d.outcome?.impact,
      quality: d.outcome?.quality?.[optId],
    });
  }

  function next() {
    if (step + 1 >= (c.decisions?.length || 0)) {
      completeRun(runId);
    }
    setStep((s) => s + 1);
    setChosen(null);
    setRevealed(false);
  }

  return (
    <div className="page case-player">
      <header className="page-header">
        <div className="muted">{c.era} · {c.domain}</div>
        <h1>{c.title}</h1>
        <p>{c.summary}</p>
      </header>
      <section className="card">
        <h2>Situation</h2>
        <p>{d.situation}</p>
        <h3>Concept</h3>
        <p>{d.concept}</p>
        <h3>Evidence</h3>
        <p>{d.evidence}</p>
        {!revealed && (
          <div className="options">
            {d.options?.map((o) => (
              <button key={o.id} className="btn block" onClick={() => pick(o.id)}>{o.label}</button>
            ))}
          </div>
        )}
        {revealed && (
          <div className="outcome">
            <h3>What happened</h3>
            <p>{d.outcome?.historical}</p>
            <p className="muted">You chose: {d.options?.find((o) => o.id === chosen)?.label}</p>
            <button className="btn" onClick={next}>Continue</button>
          </div>
        )}
      </section>
    </div>
  );
}
