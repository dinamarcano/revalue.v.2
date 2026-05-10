import React, { useEffect, useState } from 'react';
import { supabase } from '../../../api/supabaseClient';

interface Campaign {
  id: string;
  name: string;
  points_per_kg: number;
  status: string;
}

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error("Error:", error.message);
    else setCampaigns(data || []);
    setLoading(false);
  };

  const deleteCampaign = async (id: string) => {
    if (!window.confirm("¿Estás seguro de eliminar esta campaña?")) return;

    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', id);

    if (error) alert("Error al borrar: " + error.message);
    else fetchCampaigns(); 
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  
  const getMaterialStyle = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('plastico') || n.includes('plastic')) return 'border-blue-200 bg-blue-50 text-blue-700';
    if (n.includes('vidrio') || n.includes('glass')) return 'border-purple-200 bg-purple-50 text-purple-700';
    if (n.includes('papel') || n.includes('paper')) return 'border-orange-200 bg-orange-50 text-orange-700';
    return 'border-green-200 bg-green-50 text-green-700';
  };

  if (loading) return <p className="text-gray-400 italic">Cargando tus campañas...</p>;

  return (
    <div className="grid grid-cols-1 gap-4">
      {campaigns.map((camp) => (
        <div key={camp.id} className="bg-white border border-gray-100 p-5 rounded-3xl flex justify-between items-center group hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            {/* Indicador visual de color */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl border-2 ${getMaterialStyle(camp.name)}`}>
              {camp.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-black text-lg text-(--color-revalue-dark)">{camp.name}</h3>
              <p className="text-sm text-(--color-revalue-green) font-bold uppercase">{camp.points_per_kg} pts / kg</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-1 rounded-full text-[10px] font-black uppercase bg-gray-100 text-gray-500">
              {camp.status}
            </span>
            {/* Botón de eliminar que aparece al pasar el mouse (o fijo en móvil) */}
            <button 
              onClick={() => deleteCampaign(camp.id)}
              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
              title="Eliminar campaña"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CampaignList;