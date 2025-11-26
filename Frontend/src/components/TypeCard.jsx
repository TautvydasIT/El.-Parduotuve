import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function TypeCard({ type, user, onEdit, onDelete }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="bg-white rounded-lg shadow p-4 flex flex-col relative"
    >
      {/* Buttons (admin) */}
      {user?.role === "admin" && (
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            onClick={() => onEdit(type)}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(type.id)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      )}

      <div className="h-72 flex items-center justify-center overflow-hidden rounded-md bg-gray-50">
        <img
          src={type.image || "/placeholder.png"}
          alt={type.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="mt-4 font-semibold text-lg">{type.name}</h3>
      <div className="mt-4 flex items-center justify-between">
        <Link
          to={`/types/${type.id}/products`}
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          Browse products
        </Link>
      </div>
    </motion.article>
  );
}
