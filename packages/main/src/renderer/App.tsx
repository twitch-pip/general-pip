import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import Index from './pages';
import Pip from './pages/pip';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pip />} />
        <Route path="/pip" element={<Pip />} />
      </Routes>
    </Router>
  );
}
