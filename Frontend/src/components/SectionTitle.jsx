import { Search } from "lucide-react";

export default function SectionTitle({ title, subtitle }) {
  return (
    <div id="types" className="mb-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}
