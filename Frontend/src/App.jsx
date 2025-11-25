import React, { useEffect, useState } from "react";
import axios from "axios";
import { Menu, X, User, ShoppingCart, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// NOTE: This file is intended to be used inside a Vite + React project with TailwindCSS enabled.
// Put this file in src/App.jsx (or similar) and import it in main.jsx.

const API_BASE = import.meta.env.VITE_API_BASE || "https://api.example.com/api";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-800">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Hero />
        <SectionTitle title="Product types" subtitle="Choose a category to explore our products" />
        <TypesGrid />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-600 text-white px-3 py-2 font-bold">E‑Shop</div>
          <nav className="hidden md:flex gap-4 items-center">
            <a className="text-sm hover:text-indigo-600 transition" href="#">Home</a>
            <a className="text-sm hover:text-indigo-600 transition" href="#types">Types</a>
            <a className="text-sm hover:text-indigo-600 transition" href="#about">About</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-2 py-1 px-3 border rounded-md hover:shadow-sm transition" onClick={() => setShowAuth(true)}>
              <User size={16} />
              <span className="text-sm">Login / Register</span>
            </button>
            <button className="py-1 px-3 rounded-md flex items-center gap-2 border hover:bg-indigo-50 transition">
              <ShoppingCart size={16} /> <span className="text-sm">Cart</span>
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden border-t">
            <div className="px-4 py-3 flex flex-col gap-3">
              <a className="py-2 rounded-md hover:bg-gray-100" href="#">Home</a>
              <a className="py-2 rounded-md hover:bg-gray-100" href="#types">Types</a>
              <a className="py-2 rounded-md hover:bg-gray-100" href="#about">About</a>
              <button onClick={() => setShowAuth(true)} className="py-2 rounded-md border">Login / Register</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </header>
  );
}

function Hero() {
  return (
    <section className="rounded-lg overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 text-white p-8 mb-8">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Shop smart. Buy happy.</h1>
          <p className="mt-3 max-w-xl">Browse our curated categories and find high-quality products with real user reviews. Responsive UI, fast searches and secure authentication.</p>

          <div className="mt-6 flex gap-3">
            <a href="#types" className="bg-white text-indigo-600 px-4 py-2 rounded-md font-semibold shadow hover:translate-y-[-2px] transition">Browse Types</a>
            <a href="#about" className="px-4 py-2 rounded-md border border-white/40 hover:bg-white/10 transition">Learn more</a>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/hero-product.png"
            alt="hero"
            className="max-w-full h-48 md:h-56 object-contain rounded-lg shadow-lg bg-white/30 p-3"
          />
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div id="types" className="mb-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div className="hidden md:block">
        <Search />
      </div>
    </div>
  );
}

function TypesGrid() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get(`${API_BASE}/types`)
      .then((res) => {
        if (!mounted) return;
        setTypes(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error(err);
        setError(err.message || "Failed to load");
        setLoading(false);
      });
    return () => (mounted = false);
  }, []);

  if (loading) return <div className="py-10 text-center">Loading types...</div>;
  if (error) return <div className="py-10 text-center text-red-600">{error}</div>;

  if (types.length === 0) return <div className="py-10 text-center">No types available.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {types.map((t) => (
        <TypeCard key={t.id} type={t} />
      ))}
    </div>
  );
}

function TypeCard({ type }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="bg-white rounded-lg shadow p-4 flex flex-col">
      <div className="h-40 flex items-center justify-center overflow-hidden rounded-md bg-gray-50">
        <img
          src={type.image || "/placeholder.png"}
          alt={type.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <h3 className="mt-4 font-semibold text-lg">{type.name}</h3>
      <p className="mt-2 text-sm text-gray-500 flex-1">{type.description || "No description"}</p>
      <div className="mt-4 flex items-center justify-between">
        <a href={`/types/${type.id}/products`} className="text-sm font-medium text-indigo-600 hover:underline">Browse products</a>
        <span className="text-sm text-gray-400">{type.product_count ?? "–"} items</span>
      </div>
    </motion.article>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-8">
      <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-bold">E‑Shop</h4>
          <p className="text-sm text-gray-400 mt-2">A small e‑shop demo for the lab assignment. Responsive layout, accessible inputs and a modal-based auth UI.</p>
        </div>

        <div>
          <h5 className="font-semibold">Links</h5>
          <ul className="mt-2 text-sm text-gray-400 space-y-1">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#types" className="hover:text-white">Types</a></li>
            <li><a href="#about" className="hover:text-white">About</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold">Contact</h5>
          <p className="text-sm text-gray-400 mt-2">support@example.com</p>
        </div>
      </div>
      <div className="border-t border-gray-800 py-3 text-center text-xs text-gray-500">© {new Date().getFullYear()} E‑Shop — All rights reserved</div>
    </footer>
  );
}

function AuthModal({ onClose }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

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
            <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-sm text-indigo-600 underline">
              {mode === "login" ? "Create account" : "Have an account? Login"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
