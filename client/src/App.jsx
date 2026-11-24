import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import GigListPage from './pages/GigListPage';
import AddGigPage from './pages/AddGigPage';
import EditGigPage from './pages/EditGigPage';
import StatsPage from './pages/StatsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<GigListPage />} />
          <Route path="/add" element={<AddGigPage />} />
          <Route path="/edit/:gigId" element={<EditGigPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
