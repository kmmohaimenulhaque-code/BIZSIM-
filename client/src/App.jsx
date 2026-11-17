import { Routes, Route, Navigate } from 'react-router-dom';
import Shell from './components/Shell.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Explore from './pages/Explore.jsx';
import CasePlayer from './pages/CasePlayer.jsx';
import Research from './pages/Research.jsx';
import Workspace from './pages/Workspace.jsx';

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/case/:id" element={<CasePlayer />} />
        <Route path="/research" element={<Research />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  );
}
