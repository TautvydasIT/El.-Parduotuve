import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Products() {
  const { typeId } = useParams();
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/types/${typeId}/products`)
      .then((res) => setProducts(res.data.products || []))
      .catch(console.error);
  }, [typeId]);

  const handleDeleteProduct = async (id) => {
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

  if (!products.length) return <div>No products found</div>;

  return (
    <div>
      {user?.role === "admin" && (
        <button
          onClick={() => console.log("Open Create Product Form")}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Product
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="relative">
            <Link
              to={`/products/${p.id}`}
              className="block bg-white rounded-lg shadow p-4 hover:shadow-lg transition flex flex-col"
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
            </Link>

            {user?.role === "admin" && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => console.log("Open Edit Product Form", p)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(p.id)}
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
