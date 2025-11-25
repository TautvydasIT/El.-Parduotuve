import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/products/${productId}`)
      .then(res => setProduct(res.data))
      .catch(console.error);

    axios.get(`${API_BASE}/products/${productId}/reviews`)
      .then(res => setReviews(res.data))
      .catch(console.error);
  }, [productId]);

  if (!product) return <div>Loading product...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>{product.description}</p>

      <h2 className="mt-6 text-xl font-semibold">Reviews</h2>
      {reviews.length === 0 ? <p>No reviews yet</p> : (
        <ul className="space-y-3">
          {reviews.map(r => (
            <li key={r.id} className="border p-3 rounded">
              <p className="font-semibold">{r.user_name}</p>
              <p>{r.comment}</p>
              <p className="text-sm text-gray-500">{r.rating} / 5</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
