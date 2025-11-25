export default function Footer() {
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
