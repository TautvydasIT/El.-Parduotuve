import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ProductDetails() {
  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Review form state
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  // Fetch product details
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE}/products/${productId}`)
      .then(res => setProduct(res.data))
      .catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false));
  }, [productId]);

  // Fetch reviews for this product
  useEffect(() => {
    if (!product?.type_id) return; // Wait until product is loaded

    axios
      .get(`${API_BASE}/types/${product.type_id}/products/${productId}/reviews`)
      .then(res => setReviews(res.data || []))
      .catch(err => console.error(err));
  }, [product, productId]);

  // Submit review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_BASE}/reviews`,
        { product_id: Number(productId), comment, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Append new review with current user's name
      setReviews(prev => [
        ...prev,
        {
          ...res.data,
          user_name: user?.name || "You"
        }
      ]);

      setComment("");
      setRating(5);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="py-10 text-center">Loading...</div>;
  if (error) return <div className="py-10 text-center text-red-600">{error}</div>;
  if (!product) return <div className="py-10 text-center">Product not found</div>;

  const handleDeleteReview = async (reviewId) => {
  if (!confirm("Are you sure you want to delete this review?")) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(`${API_BASE}/reviews/${reviewId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Remove from UI
    setReviews(prev => prev.filter(r => r.id !== reviewId));

  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Failed to delete review");
  }
};

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 space-y-6">
      {/* Product Info */}
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

      {/* Reviews */}
      <section>
  <h3 className="text-xl font-semibold mb-2">Reviews</h3>

  {reviews.length === 0 ? (
    <p className="text-gray-500">No reviews yet.</p>
  ) : (
    <ul className="space-y-4">
      {reviews.map(r => (
  <li key={r.id} className="border p-3 rounded-md bg-gray-50 relative">
    <p className="font-medium">{r.user_name || "Anonymous"}</p>

    {r.editing ? (
      // EDIT FORM
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const token = localStorage.getItem("token");
            const res = await axios.put(
              `${API_BASE}/reviews/${r.id}`,
              {
                product_id: r.product_id,
                author: user.name || user.email,
                rating: r.editRating,
                comment: r.editComment,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            // update the review in state
            setReviews(prev =>
              prev.map(rv =>
                rv.id === r.id ? { ...res.data, user_name: user.name } : rv
              )
            );
          } catch (err) {
            alert(err.response?.data?.message || "Failed to update review");
          }
        }}
        className="space-y-2 mt-2"
      >
        <textarea
          className="w-full border rounded px-2 py-1"
          value={r.editComment}
          onChange={(e) =>
            setReviews(prev =>
              prev.map(rv =>
                rv.id === r.id ? { ...rv, editComment: e.target.value } : rv
              )
            )
          }
        />
        <select
          className="border rounded px-2 py-1"
          value={r.editRating}
          onChange={(e) =>
            setReviews(prev =>
              prev.map(rv =>
                rv.id === r.id ? { ...rv, editRating: Number(e.target.value) } : rv
              )
            )
          }
        >
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <button
          type="submit"
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() =>
            setReviews(prev =>
              prev.map(rv =>
                rv.id === r.id ? { ...rv, editing: false } : rv
              )
            )
          }
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 ml-2"
        >
          Cancel
        </button>
      </form>
    ) : (
      // VIEW MODE
      <>
        <p className="text-gray-600 text-sm">{r.comment}</p>
        {r.rating && <p className="text-yellow-500 text-sm">⭐ {r.rating}</p>}

        {user && user.id === r.user_id && (
          <button
            onClick={() =>
              setReviews(prev =>
                prev.map(rv =>
                  rv.id === r.id
                    ? { ...rv, editing: true, editComment: rv.comment, editRating: rv.rating }
                    : rv
                )
              )
            }
            className="absolute top-2 right-16 text-blue-500 text-sm hover:underline"
          >
            Edit
          </button>
        )}

        {/* DELETE BUTTON */}
        {user && (user.id === r.user_id || user.role === "admin") && (
          <button
            onClick={() => handleDeleteReview(r.id)}
            className="absolute top-2 right-2 text-red-500 text-sm hover:underline"
          >
            Delete
          </button>
        )}
      </>
    )}
  </li>
))}

    </ul>
  )}
</section>


      {/* Review Form (only if logged in) */}
      {user ? (
        <section className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Write a Review</h3>
          <form onSubmit={handleReviewSubmit} className="space-y-3">
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              rows={4}
              required
            />
            <div className="flex items-center gap-3">
              <label className="font-medium">Rating:</label>
              <select
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
                className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </section>
      ) : (
        <p className="text-gray-500 mt-4">You must be logged in to write a review.</p>
      )}
    </div>
  );
}
