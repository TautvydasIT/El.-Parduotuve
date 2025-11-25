import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import TypeCard from "./TypeCard";

const API_BASE = import.meta.env.VITE_API_BASE || "https://api.example.com/api";

export default function TypesGrid() {
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

  if (loading) return <div className="py-10 text-center">Loading types...</div>;
  if (error) return <div className="py-10 text-center text-red-600">{error}</div>;
  if (types.length === 0) return <div className="py-10 text-center">No types available.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {types.map((t) => (
        <TypeCard key={t.id} type={t} />
      ))}
    </div>
  );
}
