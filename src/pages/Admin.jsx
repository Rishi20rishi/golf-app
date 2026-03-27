import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [scores, setScores] = useState([]);
  const [winnings, setWinnings] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch all scores
  const fetchScores = async () => {
    const { data } = await supabase.from("scores").select("*");
    setScores(data || []);
  };

  // ✅ Fetch all winnings
  const fetchWinnings = async () => {
    const { data } = await supabase
      .from("winnings")
      .select("*")
      .order("id", { ascending: false });

    setWinnings(data || []);
  };

  useEffect(() => {
    fetchScores();
    fetchWinnings();
  }, []);

  // 🎲 Generate draw numbers
  const generateDraw = () => {
    let numbers = [];

    while (numbers.length < 5) {
      let num = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(num)) numbers.push(num);
    }

    return numbers;
  };

  // 🧠 Check matches
  const checkMatches = (userScores, drawNumbers) => {
    return userScores.filter((s) => drawNumbers.includes(s)).length;
  };

  // 🚀 Run Draw (ADMIN CONTROL)
  const runDraw = async () => {
    const drawNumbers = generateDraw();

    alert("🎲 Draw Numbers: " + drawNumbers.join(", "));

    const { data } = await supabase.from("scores").select("*");

    let userMap = {};

    data.forEach((item) => {
      if (!userMap[item.user_id]) {
        userMap[item.user_id] = [];
      }
      userMap[item.user_id].push(item.score);
    });

    for (let userId in userMap) {
      const matches = checkMatches(userMap[userId], drawNumbers);

      if (matches >= 1) {
        await supabase.from("winnings").insert({
          user_id: userId,
          match_count: matches,
          amount: matches * 100,
          status: "pending", // default pending
        });
      }
    }

    fetchWinnings();
  };

  // 💰 Mark as Paid
  const markAsPaid = async (id) => {
    await supabase
      .from("winnings")
      .update({ status: "paid" })
      .eq("id", id);

    fetchWinnings();
  };

  // 🔓 Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white p-6">
      <div className="max-w-5xl mx-auto">

        {/* 🔥 HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">👨‍💼 Admin Panel</h1>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-500 px-4 py-2 rounded font-bold hover:scale-105 transition"
            >
              ⬅ Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded font-bold hover:scale-105 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* 🎲 Run Draw */}
        <div className="text-center mb-6">
          <button
            onClick={runDraw}
            className="bg-yellow-500 px-6 py-2 rounded text-black font-bold hover:scale-105 transition"
          >
            Run Draw 🎲
          </button>
        </div>

        {/* 📊 Scores */}
        <div className="bg-white/10 p-4 rounded-xl mb-6">
          <h2 className="mb-3 text-xl font-semibold">
            📊 All User Scores
          </h2>

          {scores.length === 0 ? (
            <p>No scores</p>
          ) : (
            scores.map((s) => (
              <div
                key={s.id}
                className="border-b border-gray-700 py-2"
              >
                <span className="text-gray-300">
                  User: {s.user_id}
                </span>{" "}
                | Score:{" "}
                <span className="font-bold">{s.score}</span>
              </div>
            ))
          )}
        </div>

        {/* 🏆 Winnings */}
        <div className="bg-white/10 p-4 rounded-xl">
          <h2 className="mb-3 text-xl font-semibold">
            🏆 All Winnings
          </h2>

          {winnings.length === 0 ? (
            <p>No winnings yet</p>
          ) : (
            winnings.map((w) => (
              <div
                key={w.id}
                className="border-b border-gray-700 py-2 flex justify-between items-center"
              >
                <div>
                  <span className="text-gray-300">
                    User: {w.user_id}
                  </span>{" "}
                  | Matches: {w.match_count} | ₹{" "}
                  <span className="font-bold">{w.amount}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={
                      w.status === "paid"
                        ? "text-green-400 font-bold"
                        : "text-yellow-400 font-bold"
                    }
                  >
                    {w.status || "pending"}
                  </span>

                  {w.status !== "paid" && (
                    <button
                      onClick={() => markAsPaid(w.id)}
                      className="bg-green-500 px-3 py-1 rounded text-sm hover:scale-105 transition"
                    >
                      Mark Paid
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

