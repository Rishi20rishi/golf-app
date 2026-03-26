import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded-xl w-80">
        <h2 className="text-2xl mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 text-black rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 text-black rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-2 rounded"
        >
          Login
        </button>

        <p className="mt-3 text-center text-sm">
          Don't have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}