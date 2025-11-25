import { Search } from "lucide-react";

export default function SectionTitle({ title, subtitle }) {
  return (
    <div id="types" className="mb-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div className="flex items-center border rounded px-2 py-1 w-full max-w-sm">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-grow outline-none px-2"
        />
        <Search size={20} className="text-gray-600" />
      </div>
    </div>
  );
}
