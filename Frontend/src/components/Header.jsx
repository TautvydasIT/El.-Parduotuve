import { useState, useContext } from "react";
import { User } from "lucide-react";
import AuthModal from "./AuthModal";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const [showAuth, setShowAuth] = useState(false);

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="rounded-xl bg-indigo-600 text-white px-3 py-2 font-bold cursor-pointer hover:bg-indigo-700 transition"
          >
            E‑Shop
          </Link>

          {/* New navigation links */}
          <nav className="flex items-center gap-3">
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition">
              About Us
            </Link>
            <Link to="/help" className="text-gray-700 hover:text-indigo-600 transition">
              Help
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="font-medium text-gray-700">Hello, {user.name || user.email}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <User size={16} /> Login / Register
            </button>
          )}
        </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </header>
  );
}
