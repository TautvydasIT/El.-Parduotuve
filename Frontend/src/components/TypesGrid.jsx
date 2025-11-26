import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import TypeCard from "./TypeCard";
import { UserContext } from "../context/UserContext";
import Modal from "./Modal"; // simple modal component

const API_BASE = import.meta.env.VITE_API_BASE;

export default function TypesGrid() {
  const { user } = useContext(UserContext);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null); // null = create new
  const [formData, setFormData] = useState({ name: "", image: "" });

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/types`);
      setTypes(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load types");
      setLoading(false);
    }
  };

  const handleDeleteType = async (id) => {
    if (!confirm("Are you sure you want to delete this type?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/types/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTypes((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete type");
    }
  };

  const openCreateModal = () => {
    setEditingType(null);
    setFormData({ name: "", image: "" });
    setModalOpen(true);
  };

  const openEditModal = (type) => {
    setEditingType(type);
    setFormData({ name: type.name, image: type.image || "" });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (editingType) {
        // Edit
        const res = await axios.put(
          `${API_BASE}/types/${editingType.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTypes((prev) =>
          prev.map((t) => (t.id === editingType.id ? res.data : t))
        );
      } else {
        // Create
        const res = await axios.post(`${API_BASE}/types`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTypes((prev) => [res.data, ...prev]);
      }
      setModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save type");
    }
  };

  if (loading) return <div className="py-10 text-center">Loading types...</div>;
  if (error) return <div className="py-10 text-center text-red-600">{error}</div>;
  if (types.length === 0) return <div className="py-10 text-center">No types available.</div>;

  return (
    <div>
      {user?.role === "admin" && (
        <button
          onClick={openCreateModal}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Type
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {types.map((t) => (
          <TypeCard
            key={t.id}
            type={t}
            user={user}
            onEdit={openEditModal}
            onDelete={handleDeleteType}
          />
        ))}
      </div>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2 className="text-xl font-semibold mb-4">
            {editingType ? "Edit Type" : "Create Type"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border px-3 py-2 rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              className="w-full border px-3 py-2 rounded"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
