// src/components/AuthModal.jsx
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AuthModal({ onClose }) {
  const { setUser } = useContext(UserContext);
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "login") {
        // 1. Login
        const res = await axios.post(`${API_BASE}/auth/login`, {
          email: form.email,
          password: form.password,
        });

        // 2. Save access token locally
        localStorage.setItem("token", res.data.accessToken);

        // 3. Fetch user info
        const userRes = await axios.get(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${res.data.accessToken}` },
        });

        setUser(userRes.data); // <- updates Header immediately
      } else {
        // Register
        await axios.post(`${API_BASE}/auth/register`, {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        setMode("login");
      }

      onClose(); // close modal
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Auth failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white rounded-lg w-full max-w-md p-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {mode === "login" ? "Login" : "Register"}
          </h3>
          <button onClick={onClose} aria-label="close">
            ✕
          </button>
        </div>

        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:translate-y-[-1px] transition cursor-pointer"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Login"
                : "Register"}
            </button>

            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-sm text-indigo-600 underline hover:text-indigo-800 transition cursor-pointer"
            >
              {mode === "login"
                ? "Create account"
                : "Have an account? Login"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
