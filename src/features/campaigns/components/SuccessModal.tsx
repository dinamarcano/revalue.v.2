import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  points: number;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, points }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Fondo oscuro traslúcido */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Contenido del Modal */}
      <div className="relative bg-white w-full max-w-md rounded-[50px] p-12 flex flex-col items-center text-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] animate-in zoom-in duration-300">
        <h2 className="text-4xl font-black text-(--color-revalue-green) italic mb-2">Success</h2>
        <p className="text-gray-400 font-bold text-sm mb-12">You completed the goal for a reward</p>

        {/* Círculo del Check */}
        <div className="w-32 h-32 border-8 border-(--color-revalue-green) rounded-full flex items-center justify-center mb-12 shadow-sm">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-(--color-revalue-green)">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        {/* Puntaje */}
        <div className="mb-16">
          <p className="text-6xl font-black text-(--color-revalue-green) leading-none">+{points}</p>
          <p className="text-4xl font-black text-(--color-revalue-green) tracking-widest mt-2">POINTS</p>
        </div>

        {/* Botón Continue */}
        <button 
          onClick={onClose}
          className="w-full bg-(--color-revalue-green) text-white py-6 rounded-3xl font-black text-xl uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;