import React, { useEffect, useState } from 'react';
import { supabase } from '../api/supabaseClient';

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('allies')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(data);
      }
      setLoading(false);
    };
    getProfile();
  }, []);

  if (loading) return <p className="p-8 text-gray-400 italic font-black uppercase text-xs tracking-widest">Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-black text-(--color-revalue-dark) mb-8 italic tracking-tighter">My Profile</h1>
      
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        {/* Banner Decorativo */}
        <div className="bg-(--color-revalue-green) h-32 w-full opacity-90 relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <div className="px-10 pb-10">
          <div className="relative -top-12 flex items-end justify-between">
            <div className="w-28 h-28 bg-white rounded-[32px] shadow-xl flex items-center justify-center text-4xl border-8 border-white font-black text-(--color-revalue-green)">
              {profile?.company_name?.charAt(0).toUpperCase() || 'R'}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12 -mt-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Company Entity</label>
              <p className="text-2xl font-black text-(--color-revalue-dark) tracking-tight">
                {profile?.company_name || 'Not available'}
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Primary Location</label>
              <p className="text-2xl font-black text-(--color-revalue-dark) tracking-tight">
                {profile?.location || 'Not set'}
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Ecosystem Status</label>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-black text-green-600 uppercase tracking-widest">Verified Ally</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Account Identifier</label>
              <p className="text-[10px] font-mono text-gray-300 truncate bg-gray-50 p-2 rounded-lg border border-gray-100">
                {profile?.id}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="mt-8 p-8 bg-green-50 rounded-[32px] border border-green-100 flex items-start gap-5">
        <div className="bg-white text-(--color-revalue-green) p-3 rounded-2xl shadow-sm">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        </div>
        <div>
          <h4 className="font-black text-green-900 text-sm uppercase tracking-tight">Public Presence</h4>
          <p className="text-green-700 text-sm font-medium leading-relaxed mt-1 opacity-80">
            This information is used to link your company's identity to the recycling machines and rewards you offer in the <strong>ReValue</strong> ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;