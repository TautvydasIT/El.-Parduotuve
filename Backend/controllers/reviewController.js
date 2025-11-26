import db from "../db/db.js";

// GET /api/reviews
export const getAllReviews = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT r.*, p.name AS product_name FROM reviews r LEFT JOIN products p ON r.product_id = p.id"
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/reviews/:id
export const getReviewById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM reviews WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/reviews
// POST /api/reviews
export const createReview = async (req, res) => {
  try {
    const { product_id, rating, comment } = req.body;
    const user_id = req.user.id; // from JWT

    if (!product_id || !rating)
      return res.status(400).json({ message: "product_id and rating are required" });

    if (typeof rating !== 'number' || rating < 1 || rating > 5)
      return res.status(400).json({ message: "rating must be 1-5" });

    const [result] = await db.query(
      "INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)",
      [product_id, user_id, rating, comment]
    );

    // Return the created review (including user_id)
    res.status(201).json({ id: result.insertId, product_id, user_id, rating, comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



// PUT /api/reviews/:id
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, user_id } = req.body;
    const loggedInUserId = req.user.id; // from auth middleware

    // Fetch the review
    const [reviews] = await db.query("SELECT * FROM reviews WHERE id = ?", [id]);
    if (reviews.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    const review = reviews[0];

    // Ensure logged-in user is the owner or admin
    if (review.user_id !== loggedInUserId && req.user.role !== "admin") {
      return res.status(403).json({ message: "You are not allowed to edit this review" });
    }

    // Ensure user_id in body (if sent) matches existing user_id
    if (user_id && Number(user_id) !== review.user_id) {
      return res.status(400).json({ message: "You cannot change the user_id of a review" });
    }

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Update the review
    await db.query(
      "UPDATE reviews SET rating = ?, comment = ? WHERE id = ?",
      [rating, comment, id]
    );

    res.status(200).json({
      id: review.id,
      product_id: review.product_id,
      user_id: review.user_id, // unchanged
      rating,
      comment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};



// DELETE /api/reviews/:id
export const deleteReview = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM reviews WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Review not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

