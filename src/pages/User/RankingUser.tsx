import React from 'react';

const RankingUser = () => {
  const players = [
    { rank: 1, name: "Rafael Pereira", score: 20, avatar: "https://i.pravatar.cc/150?u=1" },
    { rank: 2, name: "Larissa Santos", score: 19, avatar: "https://i.pravatar.cc/150?u=2" },
    { rank: 3, name: "Gabrielly Tavares", score: 16, avatar: "https://i.pravatar.cc/150?u=3" },
    { rank: 4, name: "Renan Matos", score: 12, avatar: "https://i.pravatar.cc/150?u=4" },
    { rank: 5, name: "Hugo Souza", score: 8, avatar: "https://i.pravatar.cc/150?u=5" },
    { rank: 6, name: "Jessica Silva", score: 5, avatar: "https://i.pravatar.cc/150?u=6" },
    { rank: 7, name: "Fernando Lima", score: 3, avatar: "https://i.pravatar.cc/150?u=7", isMe: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white animate-in fade-in duration-500 pb-24">
      {/* SECCIÓN DE EMBLEMAS (Parte superior) */}
      <div className="flex justify-center items-end gap-4 p-8 pt-12">
        <div className="flex flex-col items-center opacity-40 scale-75">
          <div className="w-16 h-16 bg-slate-200 rounded-2xl rotate-45 flex items-center justify-center shadow-inner">
             <span className="text-2xl -rotate-45">✨</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-orange-100 rounded-[32px] rotate-45 flex flex-col items-center justify-center shadow-md border-4 border-white relative">
             <span className="text-4xl -rotate-45">🛡️</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 mt-8 tracking-tighter">BRONZE</h1>
        </div>

        <div className="flex flex-col items-center opacity-40 scale-75">
          <div className="w-16 h-16 bg-yellow-50 rounded-2xl rotate-45 flex items-center justify-center shadow-inner">
             <span className="text-2xl -rotate-45">🏆</span>
          </div>
        </div>
      </div>

      {/* TABLA DE POSICIONES */}
      <div className="px-6">
        <div className="bg-white border border-gray-100 rounded-[40px] shadow-2xl overflow-hidden">
          <div className="grid grid-cols-6 p-6 border-b border-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
            <div className="col-span-1">Rank</div>
            <div className="col-span-3 text-center">User</div>
            <div className="col-span-2 text-right">Score</div>
          </div>

          <div className="divide-y divide-gray-50">
            {players.map((p) => (
              <div 
                key={p.rank} 
                className={`grid grid-cols-6 items-center p-4 transition-colors ${p.isMe ? 'bg-(--color-revalue-green) text-white' : 'hover:bg-gray-50'}`}
              >
                <div className={`col-span-1 font-black text-xl ${p.isMe ? 'text-white' : 'text-slate-800'}`}>
                  {p.rank}
                </div>
                <div className="col-span-3 flex items-center gap-3">
                  <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                  <span className={`text-xs font-bold leading-tight ${p.isMe ? 'text-white' : 'text-slate-600'}`}>{p.name}</span>
                </div>
                <div className={`col-span-2 text-right font-black text-xl ${p.isMe ? 'text-white' : 'text-(--color-revalue-green)'}`}>
                  {p.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingUser;