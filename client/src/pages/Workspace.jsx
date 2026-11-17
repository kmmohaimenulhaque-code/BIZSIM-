import { useStore, exportProgress, importProgress } from '../lib/store.js';

export default function Workspace() {
  const profile = useStore((s) => s.profile);
  const settings = useStore((s) => s.settings);

  function onExport() {
    const blob = new Blob([exportProgress()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'bizsim-progress.json';
    a.click();
  }

  function onImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try { importProgress(String(reader.result)); }
      catch (err) { alert(err.message); }
    };
    reader.readAsText(file);
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Workspace</h1>
        <p className="muted">Profile, library shortcuts, and local settings</p>
      </header>
      <section className="card">
        <h2>Learning profile</h2>
        <p>Decisions: {profile?.decisions || 0}</p>
        <p>Cases completed: {profile?.casesCompleted || 0}</p>
        <pre className="code">{JSON.stringify(profile?.dimensions || {}, null, 2)}</pre>
      </section>
      <section className="card">
        <h2>Progress file</h2>
        <div className="row gap">
          <button className="btn" onClick={onExport}>Export</button>
          <label className="btn secondary">
            Import
            <input type="file" accept="application/json" hidden onChange={onImport} />
          </label>
        </div>
      </section>
      <section className="card">
        <h2>Settings</h2>
        <p className="muted">Theme: {settings?.theme || 'dark'} (toggle in shell)</p>
      </section>
    </div>
  );
}
