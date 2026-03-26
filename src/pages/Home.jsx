import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white px-6">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-5xl font-bold mb-4">
          ⛳ Golf Charity Platform
        </h1>

        <p className="text-gray-300 max-w-xl mb-6">
          Track your golf performance, win exciting monthly rewards, and support charities — all in one modern platform.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-xl hover:scale-105 transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="border border-white px-6 py-2 rounded-xl hover:bg-white hover:text-black transition"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2">📊 Track Scores</h3>
          <p className="text-gray-300">
            Enter your last 5 golf scores and monitor your performance easily.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2">🎲 Monthly Draw</h3>
          <p className="text-gray-300">
            Participate in monthly draws and win exciting rewards.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2">❤️ Support Charity</h3>
          <p className="text-gray-300">
            A portion of your subscription goes to your chosen charity.
          </p>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white/10 p-4 rounded-xl">
            <p>1️⃣ Sign Up</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl">
            <p>2️⃣ Subscribe</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl">
            <p>3️⃣ Add Scores</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl">
            <p>4️⃣ Win Rewards 🎉</p>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="text-center pb-20">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Play & Give Back?
        </h2>

        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-xl text-lg hover:scale-105 transition"
        >
          Join Now 🚀
        </button>
      </div>

    </div>
  );
}