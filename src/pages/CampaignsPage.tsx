import React, { useState } from 'react';
import CampaignList from '../features/campaigns/components/CampaignList';
import CreateCampaign from '../features/campaigns/components/CreateCampaign';

const CampaignsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-(--color-revalue-dark)">Campaigns</h1>
          <p className="text-gray-500 font-medium">Manage your recycling rewards and active campaigns.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-(--color-revalue-green) text-white px-6 py-3 rounded-full font-black text-sm shadow-md hover:scale-105 transition-transform cursor-pointer"
        >
          {showForm ? '✕ Close' : '+ Create New'}
        </button>
      </div>
      {showForm && (
        <CreateCampaign onCampaignCreated={() => {
          setShowForm(false);
          setRefreshKey(prev => prev + 1);
        }} />
      )}
      <CampaignList key={refreshKey} />
    </div>
  );
};

export default CampaignsPage;