import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAIL = "admin@golf.com";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Invalid credentials ❌");
      return;
    }

    if (data.user.email !== ADMIN_EMAIL) {
      alert("Not authorized ❌");
      navigate("/");
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-800 to-black">

      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-96 text-white">

        <h2 className="text-3xl font-bold text-center mb-6">
          🔐 Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full p-3 mb-4 rounded-lg text-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-lg text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 py-3 rounded-lg font-bold hover:scale-105 transition"
        >
          Login 🚀
        </button>

      </div>
    </div>
  );
}