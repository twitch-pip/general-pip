import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import ControlBar from './components/ControlBar';
import Index from './pages';
import Pip from './pages/pip';
import './styles/global.scss';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ControlBar />} />
      </Routes>
    </Router>
  );
}
