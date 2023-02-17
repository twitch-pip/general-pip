import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ControlBar from './components/ControlBar';
import BitmovinPlayer from './components/Players/Bitmovin';
import HLSPlayer from './components/Players/Hls';
import ShakaPlayer from './components/Players/Shaka';
import TheoPlayer from './components/Players/Theo';
import VideoPlayer from './components/Players/Video';
import Index from './pages';
import Pip from './pages/pip';
import './styles/global.scss';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/pip/youtube" element={<Pip />} />
        <Route path="/pip/twitch" element={<Pip player={HLSPlayer} />} />
        <Route path="/pip/laftel" element={<Pip player={ShakaPlayer} />} />
        <Route path="/pip/linkkf" element={<Pip />} />
        <Route path="/control" element={<ControlBar />} />
      </Routes>
    </Router>
  );
}
