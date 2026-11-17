import { Link, NavLink } from 'react-router-dom';
import { useStore, setState } from '../lib/store.js';

export default function Shell({ children }) {
  const theme = useStore((s) => s.settings?.theme || 'dark');

  function toggleTheme() {
    setState((s) => ({
      settings: { ...s.settings, theme: theme === 'dark' ? 'light' : 'dark' },
    }));
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className="shell" data-theme={theme}>
      <header className="topbar glass">
        <Link to="/" className="brand">BIZSIM</Link>
        <nav className="nav">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/research">Research</NavLink>
          <NavLink to="/workspace">Workspace</NavLink>
        </nav>
        <button className="btn ghost" onClick={toggleTheme} type="button">{theme === 'dark' ? 'Light' : 'Dark'}</button>
      </header>
      <main className="main">{children}</main>
    </div>
  );
}
