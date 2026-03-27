import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function Subscription() {
  const navigate = useNavigate();

  const subscribe = async (plan) => {
    const user = (await supabase.auth.getUser()).data.user;

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    // ✅ Simple insert (NO UPSERT)
    await supabase.from("subscriptions").insert({
      user_id: user.id,
      plan: plan,
      status: "active",
    });

    alert("Subscription Activated 🎉");

    // ✅ Direct redirect
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-6">Choose Plan</h1>

      <button
        onClick={() => subscribe("monthly")}
        className="bg-purple-500 px-6 py-2 m-2 rounded"
      >
        Monthly Plan ₹499
      </button>

      <button
        onClick={() => subscribe("yearly")}
        className="bg-green-500 px-6 py-2 m-2 rounded"
      >
        Yearly Plan ₹4999
      </button>
    </div>
  );
}