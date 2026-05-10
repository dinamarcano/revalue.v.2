import React, { useEffect, useState } from 'react';
import { supabase } from '../api/supabaseClient';

interface Reward {
  id: string;
  title: string;
  cost_points: number;
  stock: number;
  category: string;
}

const RewardsPage = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Estado para el nuevo premio
  const [newReward, setNewReward] = useState({
    title: '',
    cost_points: '',
    stock: '',
    category: 'Food'
  });

  const fetchRewards = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setRewards(data || []);
    setLoading(false);
  };

  const handleCreateReward = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase.from('rewards').insert([
      {
        title: newReward.title,
        cost_points: parseInt(newReward.cost_points),
        stock: parseInt(newReward.stock),
        category: newReward.category,
        ally_id: user.id
      }
    ]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      setNewReward({ title: '', cost_points: '', stock: '', category: 'Food' });
      setShowForm(false);
      fetchRewards();
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-(--color-revalue-dark)">Rewards Management</h1>
          <p className="text-gray-500 font-medium">Create prizes for users who recycle in your machines.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-(--color-revalue-dark) text-white px-6 py-3 rounded-full font-black text-sm shadow-md hover:scale-105 transition-all cursor-pointer"
        >
          {showForm ? '✕ Close' : '+ Add Reward'}
        </button>
      </div>

      {/* Formulario para añadir recompensa */}
      {showForm && (
        <form onSubmit={handleCreateReward} className="bg-white p-8 rounded-[32px] border-2 border-(--color-revalue-green) grid grid-cols-1 md:grid-cols-4 gap-4 items-end shadow-xl animate-in fade-in zoom-in duration-300">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Reward Title</label>
            <input 
              required
              className="bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="e.g. 10% Discount"
              value={newReward.title}
              onChange={(e) => setNewReward({...newReward, title: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Cost (Points)</label>
            <input 
              required type="number"
              className="bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="500"
              value={newReward.cost_points}
              onChange={(e) => setNewReward({...newReward, cost_points: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Initial Stock</label>
            <input 
              required type="number"
              className="bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="20"
              value={newReward.stock}
              onChange={(e) => setNewReward({...newReward, stock: e.target.value})}
            />
          </div>
          <button type="submit" className="bg-(--color-revalue-green) text-white p-4 rounded-2xl font-black shadow-lg hover:bg-green-600 transition-colors">
            Save Reward
          </button>
        </form>
      )}

      {/* Lista de Recompensas */}
      {loading ? (
        <p className="text-gray-400 italic">Cargando recompensas...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.length === 0 && !showForm && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 rounded-[40px]">
              <p className="text-gray-400 font-bold tracking-tight italic">No rewards created yet. Click "+ Add Reward" to start.</p>
            </div>
          )}
          {rewards.map(reward => (
            <div key={reward.id} className="bg-white border border-gray-100 p-6 rounded-[32px] shadow-sm hover:shadow-lg transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                <span className="bg-green-100 text-(--color-revalue-green) text-[10px] font-black px-3 py-1 rounded-full uppercase">
                  {reward.category}
                </span>
              </div>
              <h3 className="font-black text-xl text-(--color-revalue-dark) mt-2">{reward.title}</h3>
              <p className="text-(--color-revalue-green) font-black text-2xl mt-1">{reward.cost_points} pts</p>
              
              <div className="mt-6 flex justify-between items-center border-t border-gray-50 pt-4">
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Stock: {reward.stock} items</span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 cursor-default">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR Section */}
      <div className="bg-green-50 p-8 rounded-[40px] border-2 border-dashed border-green-200 flex flex-col md:flex-row items-center gap-8 mt-10">
        <div className="bg-white p-4 rounded-3xl shadow-sm">
          <div className="w-32 h-32 bg-gray-800 rounded-xl flex items-center justify-center">
             <span className="text-white text-[10px] font-black uppercase text-center p-2 italic">QR CODE</span>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-xl font-black text-green-800 tracking-tighter uppercase tracking-widest text-[12px] mb-1">Machine QR Integration</h2>
          <p className="text-green-700 text-sm font-medium opacity-80 max-w-md">
            This QR will be unique for each machine. When scanned, it connects the user's recycle action with your rewards system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;