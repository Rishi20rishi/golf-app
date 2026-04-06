import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    // ✅ Basic validation
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // ✅ Supabase signup
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful! Please login ✅");
      
      // ✅ FIX: Go to login page
      navigate("/login");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded-xl w-80 shadow-lg">
        <h2 className="text-2xl mb-4 text-center font-semibold">
          Create Account
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-2 mb-3 text-black rounded outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-2 mb-4 text-black rounded outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleSignup}
          className="w-full bg-green-500 hover:bg-green-400 transition py-2 rounded font-semibold"
        >
          Signup
        </button>

        {/* LOGIN LINK */}
        <p className="text-sm text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}