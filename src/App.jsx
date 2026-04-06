import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Subscription from "./pages/Subscription";
import AdminLogin from "./pages/AdminLogin";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/subscribe" element={<Subscription />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
  );
}

export default App;