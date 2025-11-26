import { useState, useContext } from "react";
import { User, Menu, X } from "lucide-react";
import { UserContext } from "../context/UserContext";
import AuthModal from "./AuthModal";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const [showAuth, setShowAuth] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="rounded-xl bg-indigo-600 text-white px-3 py-2 font-bold cursor-pointer hover:bg-indigo-700 transition"
        >
          E‑Shop
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          <a href="/about" className="text-gray-700 hover:text-indigo-600 transition cursor-pointer">
            About Us
          </a>
          <a href="/help" className="text-gray-700 hover:text-indigo-600 transition cursor-pointer">
            Help
          </a>
        </nav>

        {/* Desktop login / user */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="font-medium text-gray-700">{`Hello, ${user.name || user.email}`}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-red-700 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-indigo-700 transition flex items-center gap-2 cursor-pointer"
            >
              <User size={16} /> Login / Register
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-md px-4 py-3 space-y-2">
          <a
            href="/about"
            className="block text-gray-700 hover:text-indigo-600 transition cursor-pointer"
            onClick={() => setMobileOpen(false)}
          >
            About Us
          </a>
          <a
            href="/help"
            className="block text-gray-700 hover:text-indigo-600 transition cursor-pointer"
            onClick={() => setMobileOpen(false)}
          >
            Help
          </a>

          <div className="mt-2 border-t pt-2 space-y-2">
            {user ? (
              <>
                <span className="block font-medium text-gray-700">{`Hello, ${user.name || user.email}`}</span>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-red-700 transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowAuth(true);
                    setMobileOpen(false);
                  }}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-indigo-700 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <User size={16} /> Login / Register
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </header>
  );
}
