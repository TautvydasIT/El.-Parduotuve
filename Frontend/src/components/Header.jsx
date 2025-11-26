import { useState, useContext } from "react";
import { User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";
import { UserContext } from "../context/UserContext";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const [showAuth, setShowAuth] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="rounded-xl bg-indigo-600 text-white px-3 py-2 font-bold cursor-pointer hover:bg-indigo-700 transition"
        >
          E‑Shop
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition">
            About Us
          </Link>
          <Link to="/help" className="text-gray-700 hover:text-indigo-600 transition">
            Help
          </Link>
        </nav>

        {/* Desktop login / user */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="font-medium text-gray-700">
                Hello, {user.name || user.email}
              </span>
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

        {/* Mobile hamburger button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-md px-4 py-3 space-y-2">
          <Link
            to="/about"
            className="block text-gray-700 hover:text-indigo-600 transition"
            onClick={() => setMobileOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/help"
            className="block text-gray-700 hover:text-indigo-600 transition"
            onClick={() => setMobileOpen(false)}
          >
            Help
          </Link>

          <div className="mt-2 border-t pt-2">
            {user ? (
              <>
                <span className="block font-medium text-gray-700 mb-2">
                  Hello, {user.name || user.email}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowAuth(true);
                  setMobileOpen(false);
                }}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-indigo-700 transition flex items-center justify-center gap-2"
              >
                <User size={16} /> Login / Register
              </button>
            )}
          </div>
        </div>
      )}

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </header>
  );
}
