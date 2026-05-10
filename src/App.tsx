import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importaciones de Páginas
import WelcomeAlly from './pages/WelcomeAlly';
import LoginAlly from './pages/LoginAlly';
import RegisterAlly from './pages/RegisterAlly';
import MainLayout from './layouts/MainLayout';
import DashboardAlly from './pages/DashboardAlly';
import CampaignsPage from './pages/CampaignsPage';
import MachinesPage from './pages/MachinesPage';
import RewardsPage from './pages/RewardsPage';
import ProfilePage from './pages/ProfilePage'; // Importación de la página real

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<WelcomeAlly />} />
        <Route path="/login" element={<LoginAlly />} />
        <Route path="/register" element={<RegisterAlly />} />

        {/* Rutas Privadas con Sidebar (MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardAlly />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/machines" element={<MachinesPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Redirección en caso de ruta inexistente */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;