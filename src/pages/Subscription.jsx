import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function Subscription() {
  const navigate = useNavigate();

  const handlePayment = async (plan, amount) => {
    const user = (await supabase.auth.getUser()).data.user;

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      // 🔹 Create order from backend
      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      // 🔹 Razorpay options
      const options = {
        key: "rzp_test_Sa99sguOTJUBhD",
        amount: data.amount,
        currency: "INR",
        name: "Golf Charity Platform",
        description: `${plan} subscription`,
        order_id: data.id,

        handler: async function (response) {
          await supabase.from("payments").insert({
            user_id: user.id,
            plan,
            amount,
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            status: "success",
          });

          await supabase.from("subscriptions").insert({
            user_id: user.id,
            plan,
            status: "active",
          });

          alert("Payment Successful 🎉");
          navigate("/dashboard");
        },

        prefill: {
          email: user.email,
        },

        theme: {
          color: "#9333ea",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-12 text-center">
        Choose Your Plan
      </h1>

      {/* CARDS */}
      <div className="flex flex-col md:flex-row gap-8">

        {/* MONTHLY CARD */}
        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl w-72 text-center shadow-xl border border-gray-800 hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-bold mb-4">Monthly</h2>
          <p className="text-4xl font-bold mb-6">₹499</p>

          <ul className="text-gray-300 mb-6 space-y-2 text-sm">
            <li>✔ Full Dashboard Access</li>
            <li>✔ Monthly Draw Entry</li>
            <li>✔ Charity Contribution</li>
          </ul>

          <button
            onClick={() => handlePayment("monthly", 499)}
            className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded w-full font-semibold"
          >
            Subscribe
          </button>
        </div>

        {/* YEARLY CARD (Highlighted like Netflix Best Plan) */}
        <div className="bg-gradient-to-br from-purple-900 to-black p-8 rounded-2xl w-72 text-center shadow-2xl border-2 border-purple-500 hover:scale-105 transition duration-300 relative">

          {/* BEST VALUE TAG */}
          <span className="absolute top-3 right-3 bg-purple-500 text-xs px-2 py-1 rounded">
            BEST VALUE
          </span>

          <h2 className="text-2xl font-bold mb-4">Yearly</h2>
          <p className="text-4xl font-bold mb-6">₹4999</p>

          <ul className="text-gray-300 mb-6 space-y-2 text-sm">
            <li>✔ All Monthly Features</li>
            <li>✔ Priority Draw Access</li>
            <li>✔ Save More 💰</li>
          </ul>

          <button
            onClick={() => handlePayment("yearly", 4999)}
            className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded w-full font-semibold"
          >
            Subscribe
          </button>
        </div>

      </div>
    </div>
  );
}