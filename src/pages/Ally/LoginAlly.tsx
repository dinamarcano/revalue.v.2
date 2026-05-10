import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../api/supabaseClient";
import isotypeHoja from "../../assets/logos/HOJA 3 1.svg";

const LoginAlly = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Intentar iniciar sesión
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // 2. Consultar el rol del usuario en la tabla 'profiles'
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (profileError) throw profileError;

        // 3. Redirección inteligente basada en el ROL
        if (profile.role === "ally") {
          navigate("/dashboard"); // Interfaz de Empresa
        } else {
          navigate("/user/home"); // Interfaz de Ecologista
        }
      }
    } catch (error: any) {
      alert(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 animate-in fade-in duration-700">
      <img src={isotypeHoja} alt="ReValue" className="w-16 mb-12" />
      
      <div className="w-full max-w-sm">
        <h2 className="text-4xl font-black text-slate-800 italic uppercase tracking-tighter mb-2 text-center">Welcome Back</h2>
        <p className="text-gray-400 text-sm mb-10 text-center font-medium">Log in to continue your impact.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="EMAIL"
            className="w-full p-5 bg-gray-50 rounded-[24px] border-none text-sm font-bold focus:ring-2 focus:ring-(--color-revalue-green) transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="PASSWORD"
            className="w-full p-5 bg-gray-50 rounded-[24px] border-none text-sm font-bold focus:ring-2 focus:ring-(--color-revalue-green) transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-(--color-revalue-green) text-white py-5 rounded-[24px] font-black uppercase tracking-[0.2em] shadow-xl hover:opacity-95 disabled:opacity-50 mt-6 active:scale-[0.98] transition-all"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <p className="mt-10 text-center text-gray-400 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-slate-600" onClick={() => navigate("/register")}>
          Don't have an account? <span className="text-(--color-revalue-green)">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginAlly;