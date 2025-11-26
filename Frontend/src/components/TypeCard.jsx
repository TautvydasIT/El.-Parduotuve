import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function TypeCard({ type }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="bg-white rounded-lg shadow p-4 flex flex-col">
      <div className="h-72 flex items-center justify-center overflow-hidden rounded-md bg-gray-50">
        <img
          src={type.image || "/placeholder.png"}
          alt={type.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="mt-4 font-semibold text-lg">{type.name}</h3>
      <div className="mt-4 flex items-center justify-between">
        <Link to={`/types/${type.id}/products`} className="text-sm font-medium text-indigo-600 hover:underline">
  Browse products
</Link>
      </div>
    </motion.article>
  );
}
