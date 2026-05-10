import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const UserLayout = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative pb-20">
      {/* Aquí es donde se verán las pantallas (Home, Mapa, etc.) */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Barra de Navegación Inferior (La de tus diseños) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-(--color-revalue-green) h-20 flex justify-around items-center px-6 rounded-t-[32px] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50">
        
        {/* Botón Home */}
        <Link to="/user/home" className={`flex flex-col items-center gap-1 ${isActive('/user/home') ? 'text-white' : 'text-white/60'}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span className="text-[10px] font-black uppercase">Home</span>
        </Link>

        {/* Botón Scan (El del centro que sobresale un poco en tu diseño) */}
        <Link to="/user/scan" className="bg-white p-4 rounded-2xl -mt-10 shadow-lg text-(--color-revalue-green) hover:scale-110 transition-transform">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><rect x="7" y="7" width="10" height="10"></rect></svg>
        </Link>

        {/* Botón Ranking / Trofeo */}
        <Link to="/user/ranking" className={`flex flex-col items-center gap-1 ${isActive('/user/ranking') ? 'text-white' : 'text-white/60'}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
          <span className="text-[10px] font-black uppercase">Ranking</span>
        </Link>

      </nav>
    </div>
  );
};

export default UserLayout;