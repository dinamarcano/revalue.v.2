import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import SuccessModal from '../../features/campaigns/components/SuccessModal';

const UserHome = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login");
    } catch (error: any) {
      alert("Error logging out");
    }
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500 pb-28">
      {/* Botón de Logout */}
      <button 
        onClick={handleLogout}
        className="text-(--color-revalue-green) text-xs font-bold flex items-center gap-1 hover:opacity-70 transition-opacity"
      >
        ← Log out
      </button>

      {/* Fila de Score y Level */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-tight">Total for the month</span>
          <p className="text-4xl font-black text-slate-800 mt-2">3</p>
          <p className="text-[10px] font-black text-(--color-revalue-green) mt-1 uppercase tracking-tighter">Score</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-2 shadow-inner">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
          </div>
          <p className="text-[10px] font-black text-orange-600 uppercase leading-none">
            <span className="text-orange-400">BRONCE</span><br/>LEVEL
          </p>
        </div>
      </div>

      {/* TARJETA DE DESAFÍO */}
      <div className="relative overflow-hidden bg-(--color-revalue-green) rounded-[40px] p-8 shadow-xl">
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-black text-white leading-tight max-w-[150px]">
              EARN 15 POINTS
            </h2>
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M15 2H9c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 18V5h6v13H9z"/></svg>
            </div>
          </div>
          
          <div className="bg-white rounded-[32px] p-6 mt-2 shadow-lg">
             <h3 className="text-lg font-black text-slate-800 italic">Recycle 15 bottles today</h3>
             <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-black text-[10px]">PL</div>
                   <span className="text-xs font-black text-gray-400 uppercase tracking-widest text-[9px]">Paper Lab</span>
                </div>
                <button 
                  onClick={() => setShowSuccess(true)}
                  className="bg-(--color-revalue-green) text-white px-6 py-2 rounded-2xl font-black text-xs uppercase tracking-widest shadow-md hover:scale-105 transition-transform"
                >
                  Start
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE MAPA (Acceso rápido) */}
      <div 
        onClick={() => navigate("/user/scan")}
        className="bg-white border border-gray-100 rounded-[40px] p-2 shadow-sm overflow-hidden h-44 relative group cursor-pointer"
      >
          <img 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=600" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
            alt="map" 
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-end p-8">
             <span className="text-white font-black text-xl italic uppercase tracking-tighter">See nearby machines</span>
          </div>
      </div>

      {/* El Modal de Éxito */}
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        points={3} 
      />
    </div>
  );
};

export default UserHome;