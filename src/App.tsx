import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import UserLayout from './layouts/UserLayout';

// Páginas Ally
import WelcomeAlly from './pages/Ally/WelcomeAlly';
import LoginAlly from './pages/Ally/LoginAlly';
import RegisterAlly from './pages/Ally/RegisterAlly';
import DashboardAlly from './pages/Ally/DashboardAlly';
import CampaignsPage from './pages/Ally/CampaignsPage';
import MachinesPage from './pages/Ally/MachinesPage';
import RewardsPage from './pages/Ally/RewardsPage';
import ProfilePage from './pages/Ally/ProfilePage';

// Páginas User
import UserHome from './pages/User/UserHome';
import MachinesUser from './pages/User/MachinesUser';
import RankingUser from './pages/User/RankingUser'; // La nueva

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeAlly />} />
        <Route path="/login" element={<LoginAlly />} />
        <Route path="/register" element={<RegisterAlly />} />

        {/* RUTA ALIADO */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardAlly />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/machines" element={<MachinesPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* RUTA USUARIO */}
        <Route element={<UserLayout />}>
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/user/scan" element={<MachinesUser />} />
          <Route path="/user/ranking" element={<RankingUser />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;