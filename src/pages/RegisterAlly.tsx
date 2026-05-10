import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';
import isotypeHoja from '../assets/logos/HOJA 3 1.svg'; 

const RegisterAlly = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [ubication, setUbication] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          company_name: companyName,
          ubication: ubication,
          role: 'ally'
        }
      }
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Registration successful! Please check your email and then log in.");
      navigate('/login'); // Enviamos al usuario a iniciar sesión
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8 font-sans">
      <div className="w-full max-w-md flex justify-start mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-3 border-2 border-(--color-revalue-green) rounded-full text-(--color-revalue-green) hover:bg-green-50 transition-all cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
      </div>

      <div className="flex flex-col items-center mb-8 text-center">
        <div className="w-20 h-20 mb-4">
          <img src={isotypeHoja} alt="ReValue Isotype" className="w-full h-auto" />
        </div>
        <h1 className="text-3xl font-black text-(--color-revalue-green)">Create Your Account</h1>
      </div>

      <form onSubmit={handleRegister} className="w-full max-w-md space-y-4">
        <input 
          type="email" placeholder="Email address" 
          className="w-full p-4 bg-gray-100 rounded-2xl outline-none border-2 border-transparent focus:border-(--color-revalue-green) transition-all"
          value={email} onChange={(e) => setEmail(e.target.value)} required
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full p-4 bg-gray-100 rounded-2xl outline-none border-2 border-transparent focus:border-(--color-revalue-green) transition-all"
          value={password} onChange={(e) => setPassword(e.target.value)} required
        />
        <input 
          type="text" placeholder="Company Name" 
          className="w-full p-4 bg-gray-100 rounded-2xl outline-none border-2 border-transparent focus:border-(--color-revalue-green) transition-all"
          value={companyName} onChange={(e) => setCompanyName(e.target.value)} required
        />
        <input 
          type="text" placeholder="Ubication" 
          className="w-full p-4 bg-gray-100 rounded-2xl outline-none border-2 border-transparent focus:border-(--color-revalue-green) transition-all"
          value={ubication} onChange={(e) => setUbication(e.target.value)} required
        />
        <button className="w-full bg-(--color-revalue-green) text-white font-black py-4 rounded-full text-xl shadow-lg mt-6 active:scale-95 transition-transform cursor-pointer">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default RegisterAlly;