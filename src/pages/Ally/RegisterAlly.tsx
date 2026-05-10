import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../api/supabaseClient";
import isotypeHoja from "../../assets/logos/HOJA 3 1.svg";

const RegisterAlly = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"user" | "ally">("user"); // Por defecto es usuario/ecologista
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Crear el usuario en la autenticación de Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Guardar el nombre y el ROL en la tabla 'profiles'
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: authData.user.id,
              full_name: fullName,
              role: role, // Aquí guardamos si es 'user' o 'ally'
              score: 0,
            },
          ]);

        if (profileError) throw profileError;
        
        alert("¡Registro exitoso!");
        navigate("/login");
      }
    } catch (error: any) {
      alert(error.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8 animate-in fade-in duration-700">
      <img src={isotypeHoja} alt="ReValue" className="w-12 mb-8" />
      
      <h2 className="text-3xl font-black text-slate-800 italic uppercase tracking-tighter mb-2">Join ReValue</h2>
      <p className="text-gray-400 text-sm mb-8 text-center">Select your profile and start changing the world.</p>

      {/* SELECTOR DE ROL (Muy visual) */}
      <div className="flex gap-4 w-full max-w-sm mb-8">
        <button 
          onClick={() => setRole("user")}
          className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase transition-all ${role === "user" ? "bg-(--color-revalue-green) text-white shadow-lg scale-105" : "bg-gray-100 text-gray-400"}`}
        >
          Ecologist
        </button>
        <button 
          onClick={() => setRole("ally")}
          className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase transition-all ${role === "ally" ? "bg-(--color-revalue-green) text-white shadow-lg scale-105" : "bg-gray-100 text-gray-400"}`}
        >
          Company / Ally
        </button>
      </div>

      <form onSubmit={handleRegister} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="FULL NAME"
          className="w-full p-4 bg-gray-50 rounded-2xl border-none text-sm font-bold focus:ring-2 focus:ring-(--color-revalue-green)"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="EMAIL"
          className="w-full p-4 bg-gray-50 rounded-2xl border-none text-sm font-bold focus:ring-2 focus:ring-(--color-revalue-green)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="PASSWORD"
          className="w-full p-4 bg-gray-50 rounded-2xl border-none text-sm font-bold focus:ring-2 focus:ring-(--color-revalue-green)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-(--color-revalue-green) text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:opacity-90 disabled:opacity-50 mt-4"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default RegisterAlly;