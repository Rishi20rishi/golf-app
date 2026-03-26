import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const [score, setScore] = useState("");
  const [scores, setScores] = useState([]);
  const [winnings, setWinnings] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const navigate = useNavigate();

  // ❤️ Charity states
  const [charity, setCharity] = useState("");
  const [savedCharity, setSavedCharity] = useState(null);

  // Fetch scores
  const fetchScores = async () => {
    const user = (await supabase.auth.getUser()).data.user;

    const { data, error } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) setScores(data);
  };

  // Fetch winnings
  const fetchWinnings = async () => {
    const user = (await supabase.auth.getUser()).data.user;

    const { data } = await supabase
      .from("winnings")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false });

    setWinnings(data || []);
  };

  // ❤️ Fetch charity
  const fetchCharity = async () => {
    const user = (await supabase.auth.getUser()).data.user;

    const { data } = await supabase
      .from("charity_selection")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle(); // safer than single()

    setSavedCharity(data);
  };

  useEffect(() => {
    fetchScores();
    fetchWinnings();
    fetchCharity(); // 👈 added
  }, []);

  // Add score
  const addScore = async () => {
    if (!score || score < 1 || score > 45) {
      alert("Enter valid score (1-45)");
      return;
    }

    const user = (await supabase.auth.getUser()).data.user;

    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (data.length >= 5) {
      await supabase.from("scores").delete().eq("id", data[0].id);
    }

    await supabase.from("scores").insert({
      user_id: user.id,
      score: parseInt(score),
    });

    setScore("");
    fetchScores();
  };

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

  // 🚀 Run Draw
  const runDraw = async () => {
    const drawNumbers = generateDraw();

    alert("Draw Numbers: " + drawNumbers.join(", "));

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
        });
      }
    }

    fetchWinnings();
  };

  // ❤️ Save charity
  const saveCharity = async () => {
    if (!charity) {
      alert("Please select a charity");
      return;
    }

    const user = (await supabase.auth.getUser()).data.user;

    await supabase.from("charity_selection").upsert({
      user_id: user.id,
      charity_name: charity,
      percentage: 10,
    });

    fetchCharity();
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
     <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl">Dashboard</h1>

  <button
    onClick={() => navigate("/admin")}
    className="bg-red-500 px-4 py-2 rounded font-bold"
  >
    Admin Panel ⚙️
  </button>
</div>

      {/* Add Score */}
      <div className="bg-gray-900 p-4 rounded-xl mb-6">
        <h2 className="mb-2">Add Score</h2>

        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="p-2 text-black mr-2 rounded"
          placeholder="Enter score (1-45)"
        />

        <button
          onClick={addScore}
          className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Score List */}
      <div className="bg-gray-900 p-4 rounded-xl">
        <h2 className="mb-3">Your Last 5 Scores</h2>

        {scores.length === 0 ? (
          <p>No scores yet</p>
        ) : (
          scores.map((s) => (
            <div
              key={s.id}
              className="border-b border-gray-700 py-2 flex justify-between"
            >
              <span>Score: {s.score}</span>
              <span className="text-gray-400 text-sm">
                {new Date(s.created_at).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>

      {/* 🎲 Run Draw Button */}
      <div className="mt-6 text-center">
        <button
          onClick={runDraw}
          className="bg-yellow-500 px-6 py-2 rounded text-black font-bold"
        >
          Run Draw 🎲
        </button>
      </div>

      {/* 🏆 Winnings Section */}
      <div className="bg-gray-900 p-4 rounded-xl mt-6">
        <h2 className="mb-3">Your Winnings 🏆</h2>

        {winnings.length === 0 ? (
          <p>No winnings yet</p>
        ) : (
          winnings.map((w) => (
            <div
              key={w.id}
              className="border-b border-gray-700 py-2 flex justify-between"
            >
              <span>Matches: {w.match_count}</span>
              <span className="text-green-400 font-bold">
                ₹ {w.amount}
              </span>
            </div>
          ))
        )}
      </div>

      {/* ❤️ Charity Section */}
      <div className="bg-gray-900 p-4 rounded-xl mt-6">
        <h2 className="mb-3">Support a Charity ❤️</h2>

        <select
          onChange={(e) => setCharity(e.target.value)}
          className="p-2 text-black rounded mr-2"
        >
          <option value="">Select Charity</option>
          <option value="Helping Hands">Helping Hands</option>
          <option value="Save Children">Save Children</option>
          <option value="Food For All">Food For All</option>
        </select>

        <button
          onClick={saveCharity}
          className="bg-green-500 px-4 py-2 rounded"
        >
          Save
        </button>

        {savedCharity && (
          <p className="mt-3 text-green-400">
            Selected: {savedCharity.charity_name} (10%)
          </p>
        )}
      </div>
    </div>
  );
}