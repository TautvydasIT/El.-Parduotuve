import { motion } from "framer-motion";

export default function TypeCard({ type }) {
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
