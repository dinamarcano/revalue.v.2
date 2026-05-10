import React, { useEffect, useState } from 'react';
import { supabase } from '../api/supabaseClient';

const DashboardAlly = () => {
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Contamos cuántas filas hay en la tabla de campañas
      const { count, error } = await supabase
        .from('campaigns')
        .select('*', { count: 'exact', head: true });

      if (!error) {
        setStats({
          totalCampaigns: count || 0,
          loading: false
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col">
        <h1 className="text-3xl font-black text-(--color-revalue-dark)">Ally Dashboard</h1>
        <p className="text-gray-500 font-medium">Monitor your impact and general statistics.</p>
      </div>

      {/* Tarjetas de Resumen Dinámicas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Total Recycled</span>
          <p className="text-4xl font-black text-(--color-revalue-green) mt-1">1,250 kg</p>
          <span className="text-[10px] text-gray-400 font-bold italic">* Simulado por ahora</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-(--color-revalue-green) shadow-sm hover:shadow-md transition-shadow">
          <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Active Campaigns</span>
          <p className="text-4xl font-black text-(--color-revalue-dark) mt-1">
            {stats.loading ? '...' : stats.totalCampaigns}
          </p>
          <span className="text-[10px] text-(--color-revalue-green) font-bold uppercase">Datos Reales</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Points Awarded</span>
          <p className="text-4xl font-black text-(--color-revalue-green) mt-1">45k</p>
          <span className="text-[10px] text-gray-400 font-bold italic">* Simulado por ahora</span>
        </div>
      </div>

      {/* Gráfica de impacto (Placeholder visual) */}
      <div className="bg-white p-10 rounded-[40px] border border-gray-100 flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden">
        <div className="absolute top-6 left-10">
          <h3 className="font-black text-gray-800 text-xl tracking-tighter text-center italic opacity-10 uppercase text-6xl">Visual Analytics</h3>
        </div>
        <div className="flex gap-4 items-end h-32">
          <div className="w-8 bg-green-100 rounded-t-lg h-12"></div>
          <div className="w-8 bg-green-200 rounded-t-lg h-24"></div>
          <div className="w-8 bg-(--color-revalue-green) rounded-t-lg h-32"></div>
          <div className="w-8 bg-green-300 rounded-t-lg h-16"></div>
          <div className="w-8 bg-green-500 rounded-t-lg h-28"></div>
        </div>
        <p className="mt-8 text-gray-400 font-bold text-sm">Monthly Recycling Performance</p>
      </div>
    </div>
  );
};

export default DashboardAlly;