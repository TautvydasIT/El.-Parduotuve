import { useState } from "react";
import { Menu, X, User, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModal";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="rounded-xl bg-indigo-600 text-white px-3 py-2 font-bold cursor-pointer hover:bg-indigo-700 transition">
            E‑Shop
          </a>
          <nav className="hidden md:flex gap-4 items-center">
            <a className="text-sm hover:text-indigo-600 transition" href="#">Home</a>
            <a className="text-sm hover:text-indigo-600 transition" href="#types">Types</a>
            <a className="text-sm hover:text-indigo-600 transition" href="#about">About</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-indigo-700 hover:shadow-lg transition cursor-pointer flex items-center gap-2"
              onClick={() => setShowAuth(true)}
            >
              <User size={16} />
              <span className="text-sm">Login / Register</span>
            </button>

            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-indigo-700 hover:shadow-lg transition cursor-pointer flex items-center gap-2"
            >
              <ShoppingCart size={16} />
              <span className="text-sm">Cart</span>
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
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t"
          >
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
