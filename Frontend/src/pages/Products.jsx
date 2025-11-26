import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { UserContext } from "../context/UserContext";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Products() {
  const { typeId } = useParams();
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", price: 0, image: "" });

  useEffect(() => {
    fetchProducts();
  }, [typeId]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/types/${typeId}/products`);
      setProducts(res.data.products || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({ name: "", description: "", price: 0, image: "" });
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      description: p.description || "",
      price: p.price,
      image: p.image || "",
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (editingProduct) {
        // Edit
        const res = await axios.put(
          `${API_BASE}/products/${editingProduct.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? res.data : p))
        );
      } else {
        // Create
        const res = await axios.post(
          `${API_BASE}/products`,
          { ...formData, type_id: Number(typeId) },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProducts((prev) => [res.data, ...prev]);
      }
      setModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  if (loading) return <div className="py-10 text-center">Loading products...</div>;
  if (!products.length) return <div className="py-10 text-center">No products found</div>;

  return (
    <div>
      {user?.role === "admin" && (
        <button
          onClick={openCreateModal}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Product
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ y: -6 }}
            className="relative bg-white rounded-lg shadow p-4 flex flex-col"
          >
            {user?.role === "admin" && (
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                <button
                  onClick={() => openEditModal(p)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            )}
            <Link
              to={`/products/${p.id}`}
              className="flex flex-col items-start"
            >
              <div className="h-72 w-full overflow-hidden rounded-md bg-gray-50">
                <img
                  src={p.image || "/placeholder.png"}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-2 font-semibold text-lg">{p.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{p.description}</p>
              <p className="mt-1 font-semibold">${p.price}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Inline Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setModalOpen(false)}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white rounded-lg w-full max-w-md p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingProduct ? "Edit Product" : "Create Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border px-3 py-2 rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Description"
                className="w-full border px-3 py-2 rounded"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full border px-3 py-2 rounded"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                className="w-full border px-3 py-2 rounded"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
