import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ControlBar from './components/ControlBar';
import Shaka from './components/Players/Shaka';
import Index from './pages';
import Pip from './pages/pip';
import './styles/global.scss';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/pip/youtube" element={<Pip />} />
        <Route path="/pip/twitch" element={<Pip />} />
        <Route path="/control" element={<ControlBar />} />
      </Routes>
    </Router>
  );
}
