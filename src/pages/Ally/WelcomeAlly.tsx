import { useNavigate } from 'react-router-dom';

import revalueLogo from "../../assets/logos/REVALUE BLANCO 1.svg";

const WelcomeAlly = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-(--color-revalue-green) flex flex-col items-center justify-between p-10 text-white font-sans">
      
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {/* Contenedor del Logo ajustado al diseño de Figma */}
        <div className="w-72 mb-2"> 
          <img 
            src={revalueLogo} 
            alt="ReValue Logo" 
            className="w-full h-auto"
          />
        </div>
        <p className="text-2xl font-bold tracking-tight">Welcome to ReValue </p>
      </div>

      {/* Botones con los colores de tu guía de estilo */}
      <div className="w-full max-w-xs space-y-4 mb-10">
        <button 
          onClick={() => navigate('/login')}
          className="w-full bg-white text-(--color-revalue-green) py-4 rounded-2xl font-black text-xl shadow-lg active:scale-95 transition-transform cursor-pointer"
        >
          Login
        </button>
        <button 
          onClick={() => navigate('/register')}
          className="w-full bg-(--color-revalue-dark) text-white py-4 rounded-2xl font-black text-xl shadow-lg active:scale-95 transition-transform cursor-pointer"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default WelcomeAlly;