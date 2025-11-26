import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  const handleScrollTop = (to) => {
    if (location.pathname === to) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-200 mt-8">
      <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-bold">E-Shop</h4>
          <p className="text-sm text-gray-400 mt-2">
            A small e-shop demo for the lab assignment. Responsive layout, accessible inputs and a modal-based auth UI.
          </p>
        </div>

        <div>
          <h5 className="font-semibold">Links</h5>
          <ul className="mt-2 text-sm text-gray-400 space-y-1">
            <li>
              <Link
                to="/"
                onClick={() => handleScrollTop("/")}
                className="hover:text-white"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => handleScrollTop("/about")}
                className="hover:text-white"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                onClick={() => handleScrollTop("/help")}
                className="hover:text-white"
              >
                Help
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-3 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} E-Shop — All rights reserved
      </div>
    </footer>
  );
}
