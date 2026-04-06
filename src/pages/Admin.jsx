import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAIL = "admin@golf.com";

export default function Admin() {
  const [scores, setScores] = useState([]);
  const [winnings, setWinnings] = useState([]);
  const [payments, setPayments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    checkAdmin();
    fetchScores();
    fetchWinnings();
    fetchPayments();

    // ✅ FORCE FULL BLACK BACKGROUND
    document.body.style.background = "#000";
    document.documentElement.style.background = "#000";

    return () => {
      document.body.style.background = "";
      document.documentElement.style.background = "";
    };
  }, []);

  // 🔐 ADMIN AUTH
  const checkAdmin = async () => {
    const user = (await supabase.auth.getUser()).data.user;

    if (!user) {
      navigate("/admin-login");
      return;
    }

    if (user.email !== ADMIN_EMAIL) {
      alert("Access Denied ❌");
      navigate("/");
    }
  };

  // 📊 FETCH DATA
  const fetchScores = async () => {
    const { data } = await supabase.from("scores").select("*");
    setScores(data || []);
  };

  const fetchWinnings = async () => {
    const { data } = await supabase
      .from("winnings")
      .select("*")
      .order("id", { ascending: false });

    setWinnings(data || []);
  };

  const fetchPayments = async () => {
    const { data } = await supabase
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false });

    setPayments(data || []);
  };

  // 🎲 DRAW LOGIC
  const generateDraw = () => {
    let numbers = [];
    while (numbers.length < 5) {
      let num = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(num)) numbers.push(num);
    }
    return numbers;
  };

  const checkMatches = (userScores, drawNumbers) => {
    return userScores.filter((s) => drawNumbers.includes(s)).length;
  };

  const runDraw = async () => {
    const drawNumbers = generateDraw();
    alert("🎲 Draw Numbers: " + drawNumbers.join(", "));

    const { data } = await supabase.from("scores").select("*");

    let userMap = {};

    data.forEach((item) => {
      if (!userMap[item.user_id]) userMap[item.user_id] = [];
      userMap[item.user_id].push(item.score);
    });

    for (let userId in userMap) {
      const matches = checkMatches(userMap[userId], drawNumbers);

      if (matches >= 1) {
        await supabase.from("winnings").insert({
          user_id: userId,
          match_count: matches,
          amount: matches * 100,
          status: "pending",
        });
      }
    }

    fetchWinnings();
  };

  // 💰 MARK PAID
  const markAsPaid = async (id) => {
    await supabase
      .from("winnings")
      .update({ status: "paid" })
      .eq("id", id);

    fetchWinnings();
  };

  // 🔓 LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">👨‍💼 Admin Panel</h1>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-gray-700 px-4 py-2 rounded"
            >
              ⬅ Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* DRAW */}
        <div className="text-center mb-6">
          <button
            onClick={runDraw}
            className="bg-yellow-500 px-6 py-2 rounded text-black font-bold"
          >
            Run Draw 🎲
          </button>
        </div>

        {/* SCORES */}
        <div className="bg-gray-900 p-4 rounded-xl mb-6">
          <h2 className="text-xl mb-3">📊 User Scores</h2>

          {scores.map((s) => (
            <div key={s.id} className="border-b border-gray-700 py-2">
              User: {s.user_id} | Score: {s.score}
            </div>
          ))}
        </div>

        {/* WINNINGS */}
        <div className="bg-gray-900 p-4 rounded-xl mb-6">
          <h2 className="text-xl mb-3">🏆 Winnings</h2>

          {winnings.map((w) => (
            <div key={w.id} className="flex justify-between py-2 border-b border-gray-700">
              <div>
                User: {w.user_id} | Matches: {w.match_count} | ₹{w.amount}
              </div>

              <div className="flex gap-3 items-center">
                <span className={w.status === "paid" ? "text-green-400" : "text-yellow-400"}>
                  {w.status}
                </span>

                {w.status !== "paid" && (
                  <button
                    onClick={() => markAsPaid(w.id)}
                    className="bg-green-500 px-3 py-1 rounded"
                  >
                    Mark Paid
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 💳 PAYMENTS SECTION (NEW 🔥) */}
        <div className="bg-gray-900 p-4 rounded-xl">
          <h2 className="text-xl mb-3">💳 Payment History</h2>

          {payments.length === 0 ? (
            <p>No payments yet</p>
          ) : (
            payments.map((p) => (
              <div
                key={p.id}
                className="border-b border-gray-700 py-2 flex justify-between"
              >
                <div>
                  User: {p.user_id} | ₹{p.amount} | {p.plan}
                </div>

                <div className="text-sm text-gray-400">
                  {p.status} | {new Date(p.created_at).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}