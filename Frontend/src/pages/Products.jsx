import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Products() {
  const { typeId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
  axios.get(`${API_BASE}/types/${typeId}/products`)
    .then(res => setProducts(res.data.products)) 
    .catch(console.error);
}, [typeId]);

  if (!products.length) return <div>No products found</div>;

  return (
    <div className="h-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(p => (
        <Link key={p.id} to={`/products/${p.id}`} className="block bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
          <img src={p.image || "/placeholder.png"} alt={p.name} className="h-40 w-full object-contain" />
          <h3 className="mt-2 font-semibold">{p.name}</h3>
          <p className="text-sm text-gray-500">{p.description}</p>
        </Link>
      ))}
    </div>
  );
}
