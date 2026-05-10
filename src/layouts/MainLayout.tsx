import React from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';
import revalueLogoVerde from '../assets/logos/HOJA 3 1.svg'; 

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Header Superior */}
      <header className="bg-white border-b border-gray-100 p-4 px-8 flex justify-between items-center shadow-sm sticky top-0 z-10">
        <div className="h-7">
          <img src={revalueLogoVerde} alt="ReValue Logo" className="h-full w-auto" />
        </div>
        <button 
          onClick={handleLogout}
          className="text-gray-400 font-bold hover:text-red-500 transition-colors cursor-pointer text-sm font-black uppercase tracking-tight"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Lateral */}
        <nav className="w-64 bg-white border-r border-gray-100 p-6 hidden md:flex flex-col gap-2">
          
          <Link 
            to="/dashboard" 
            className={`flex items-center gap-3 p-4 rounded-2xl font-black transition-all ${
              isActive('/dashboard') ? 'bg-green-50 text-(--color-revalue-green)' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Dashboard
          </Link>
          
          <Link 
            to="/campaigns" 
            className={`flex items-center gap-3 p-4 rounded-2xl font-black transition-all ${
              isActive('/campaigns') ? 'bg-green-50 text-(--color-revalue-green)' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
            Campaigns
          </Link>

          <Link 
            to="/machines" 
            className={`flex items-center gap-3 p-4 rounded-2xl font-black transition-all ${
              isActive('/machines') ? 'bg-green-50 text-(--color-revalue-green)' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            My Machines
          </Link>

          {/* SECCIÓN DE RECOMPENSAS (REWARDS) */}
          <Link 
            to="/rewards" 
            className={`flex items-center gap-3 p-4 rounded-2xl font-black transition-all ${
              isActive('/rewards') ? 'bg-green-50 text-(--color-revalue-green)' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path></svg>
            Rewards
          </Link>

          <div className="my-4 border-t border-gray-50"></div>

          <Link 
            to="/profile" 
            className={`flex items-center gap-3 p-4 rounded-2xl font-black transition-all ${
              isActive('/profile') ? 'bg-green-50 text-(--color-revalue-green)' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            My Profile
          </Link>
        </nav>

        {/* Contenido Principal */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;