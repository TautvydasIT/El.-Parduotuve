import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    // Fetch product details
    const fetchProduct = axios.get(`${API_BASE}/products/${productId}`);
    // Fetch product reviews
    const fetchReviews = axios.get(`${API_BASE}/products/${productId}/reviews`);

    Promise.all([fetchProduct, fetchReviews])
      .then(([prodRes, revRes]) => {
        if (!mounted) return;
        setProduct(prodRes.data);
        // Backend might return {reviews: [...]}, adjust if necessary
        setReviews(revRes.data.reviews || revRes.data || []);
      })
      .catch(err => {
        if (!mounted) return;
        console.error(err);
        setError(err.message || "Failed to load product");
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [productId]);

  if (loading) return <div className="py-10 text-center">Loading...</div>;
  if (error) return <div className="py-10 text-center text-red-600">{error}</div>;
  if (!product) return <div className="py-10 text-center">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="w-full md:w-64 h-64 object-contain rounded-lg"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600">{product.brand}</p>
          <p className="text-xl font-semibold">${product.price}</p>
          <p className="text-gray-500">{product.description || "No description available."}</p>
        </div>
      </div>

      <section>
        <h3 className="text-xl font-semibold mb-2">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map(r => (
              <li key={r.id} className="border p-3 rounded-md bg-gray-50">
                <p className="font-medium">{r.user_name || "Anonymous"}</p>
                <p className="text-gray-600 text-sm">{r.comment}</p>
                {r.rating && <p className="text-yellow-500 text-sm">⭐ {r.rating}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
