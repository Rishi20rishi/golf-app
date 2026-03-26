import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) alert(error.message);
    else {
      alert("Signup successful!");
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded-xl w-80">
        <h2 className="text-2xl mb-4 text-center">Signup</h2>

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
          onClick={handleSignup}
          className="w-full bg-green-500 py-2 rounded"
        >
          Signup
        </button>
      </div>
    </div>
  );
}