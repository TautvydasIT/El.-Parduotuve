import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === "login") {
        const res = await axios.post(`${API_BASE}/auth/login`, { email: form.email, password: form.password });
        localStorage.setItem("token", res.data.token);
      } else {
        await axios.post(`${API_BASE}/auth/register`, { name: form.name, email: form.email, password: form.password });
        setMode("login");
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Auth failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{mode === "login" ? "Login" : "Register"}</h3>
          <button onClick={onClose} aria-label="close">✕</button>
        </div>

        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" required />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" required />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center justify-between">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:translate-y-[-1px] transition">
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
            </button>
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-sm text-indigo-600 underline hover:text-indigo-800 transition"
            >
              {mode === "login" ? "Create account" : "Have an account? Login"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
