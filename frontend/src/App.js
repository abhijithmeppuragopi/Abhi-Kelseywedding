import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeddingPage from './pages/WeddingPage';
import AdminPage from './pages/AdminPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeddingPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
