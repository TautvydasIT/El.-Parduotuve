import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import TypeCard from "./TypeCard";
import { UserContext } from "../context/UserContext";

const API_BASE = import.meta.env.VITE_API_BASE || "https://api.example.com/api";

export default function TypesGrid() {
  const { user } = useContext(UserContext);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${API_BASE}/types`)
      .then((res) => {
        if (!mounted) return;
        setTypes(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error(err);
        setError(err.message || "Failed to load");
        setLoading(false);
      });
    return () => (mounted = false);
  }, []);

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

  if (loading) return <div className="py-10 text-center">Loading types...</div>;
  if (error) return <div className="py-10 text-center text-red-600">{error}</div>;
  if (types.length === 0) return <div className="py-10 text-center">No types available.</div>;

  return (
    <div>
      {user?.role === "admin" && (
        <button
          onClick={() => console.log("Open Create Type Form")}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Type
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {types.map((t) => (
          <div key={t.id} className="relative">
            <TypeCard type={t} />

            {user?.role === "admin" && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => console.log("Open Edit Type Form", t)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteType(t.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
