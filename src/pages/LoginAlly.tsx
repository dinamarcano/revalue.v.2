import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';
import isotypeHoja from '../assets/logos/HOJA 3 1.svg'; 

const LoginAlly = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      // Redirección automática al Dashboard
      navigate('/dashboard'); 
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8 font-sans">
      <div className="w-full max-w-md flex justify-start mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-3 border-2 border-(--color-revalue-green) rounded-full text-(--color-revalue-green) hover:bg-green-50 transition-colors cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
      </div>

      <div className="flex flex-col items-center mb-10 text-center">
        <div className="w-24 h-24 mb-4">
          <img src={isotypeHoja} alt="ReValue Isotype" className="w-full h-auto" />
        </div>
        <h1 className="text-4xl font-black text-(--color-revalue-green)">Welcome Back</h1>
      </div>

      <form onSubmit={handleLogin} className="w-full max-w-md space-y-5">
        <input 
          type="email" 
          placeholder="Email address" 
          className="w-full p-5 bg-gray-100 rounded-3xl outline-none border-2 border-transparent focus:border-(--color-revalue-green) transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-5 bg-gray-100 rounded-3xl outline-none border-2 border-transparent focus:border-(--color-revalue-green) transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-center text-gray-400 text-sm cursor-pointer hover:text-gray-600">Forgot your password?</p>
        <button className="w-full bg-(--color-revalue-green) text-white font-black py-4 rounded-full text-xl shadow-lg mt-4 active:scale-95 transition-transform cursor-pointer">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginAlly;