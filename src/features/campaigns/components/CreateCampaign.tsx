import React, { useState } from 'react';
import { supabase } from '../../../api/supabaseClient';

const CreateCampaign = ({ onCampaignCreated }: { onCampaignCreated: () => void }) => {
  const [name, setName] = useState('');
  const [points, setPoints] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('campaigns')
      .insert([
        { name, points_per_kg: parseFloat(points) }
      ]);

    if (error) {
      alert("Error creando campaña: " + error.message);
    } else {
      alert("¡Campaña creada con éxito!");
      setName('');
      setPoints('');
      onCampaignCreated(); 
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-green-50 p-6 rounded-3xl border-2 border-dashed border-(--color-revalue-green) space-y-4">
      <h3 className="font-black text-(--color-revalue-green) text-lg">New Campaign</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text" placeholder="Campaign Name (e.g. Plastic PET)" 
          className="p-3 rounded-2xl border-none outline-none focus:ring-2 focus:ring-(--color-revalue-green)"
          value={name} onChange={(e) => setName(e.target.value)} required
        />
        <input 
          type="number" placeholder="Points per KG" 
          className="p-3 rounded-2xl border-none outline-none focus:ring-2 focus:ring-(--color-revalue-green)"
          value={points} onChange={(e) => setPoints(e.target.value)} required
        />
      </div>
      <button 
        disabled={loading}
        className="w-full bg-(--color-revalue-green) text-white font-black py-3 rounded-full hover:shadow-lg transition-all disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Save Campaign'}
      </button>
    </form>
  );
};

export default CreateCampaign;