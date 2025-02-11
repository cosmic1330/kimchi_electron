import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/home';
import Transparent from './pages/transparent';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transparent" element={<Transparent />} />
      </Routes>
    </Router>
  );
}
