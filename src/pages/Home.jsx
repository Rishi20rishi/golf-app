import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 bg-fixed text-white px-6">

      {/* 🔥 ADMIN BUTTON */}
      <div className="absolute top-6 right-6">
        <button
          // onClick={() => navigate("/admin")}
          onClick={() => navigate("/admin-login")}
          className="bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-2 rounded-xl hover:bg-white hover:text-purple-700 transition font-semibold shadow-lg"
        >
          ⚙️ Admin Panel
        </button>
      </div>

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-5xl font-bold mb-4">
          ⛳ Golf Charity Platform
        </h1>

        <p className="text-purple-100 max-w-2xl mb-6">
          Welcome to a modern golf experience where your passion meets purpose. 
          Track your performance, compete with others, win exciting rewards, and 
          contribute to meaningful causes — all from one powerful platform designed 
          for golfers who want more than just a game.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-pink-500 to-purple-400 px-6 py-2 rounded-xl hover:scale-105 transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="border border-purple-200 px-6 py-2 rounded-xl hover:bg-white hover:text-purple-700 transition"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
        
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">📊 Track Scores</h3>
          <p className="text-purple-100">
            Easily record and manage your last 5 golf scores with a clean and intuitive interface. 
            Analyze your performance trends, improve your gameplay, and stay consistent with your progress over time.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">🎲 Monthly Draw</h3>
          <p className="text-purple-100">
            Every month, get a chance to participate in exclusive lucky draws. 
            The more active you are, the better your chances of winning exciting prizes, rewards, and recognition.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">❤️ Support Charity</h3>
          <p className="text-purple-100">
            Play with purpose — a portion of your subscription directly supports 
            charities of your choice. Make every swing meaningful by contributing to 
            causes that truly matter.
          </p>
        </div>

      </div>

      {/* HOW IT WORKS */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>

        <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
          Getting started is simple and takes just a few steps. Join the platform, 
          track your performance, and start enjoying rewards while making a difference.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          
          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl hover:scale-105 transition">
            <p>1️⃣ Sign Up</p>
            <span className="text-sm text-purple-200">
              Create your account in seconds and join the community.
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl hover:scale-105 transition">
            <p>2️⃣ Subscribe</p>
            <span className="text-sm text-purple-200">
              Choose a plan and unlock premium features.
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl hover:scale-105 transition">
            <p>3️⃣ Add Scores</p>
            <span className="text-sm text-purple-200">
              Track your latest golf performances effortlessly.
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl hover:scale-105 transition">
            <p>4️⃣ Win Rewards 🎉</p>
            <span className="text-sm text-purple-200">
              Enter draws, win prizes, and support charities.
            </span>
          </div>

        </div>
      </div>

      {/* CTA SECTION */}
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Play & Give Back?
        </h2>

        <p className="text-purple-100 mb-6 max-w-xl mx-auto">
          Join thousands of golfers who are improving their game while making a positive impact. 
          Start your journey today and be part of something bigger than just golf.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-pink-500 to-purple-400 px-8 py-3 rounded-xl text-lg hover:scale-105 transition"
        >
          Join Now 🚀
        </button>
      </div>

    </div>
  );
}

