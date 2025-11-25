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
export const createReview = async (req, res) => {
  try {
    const { product_id, rating, comment } = req.body;
    const userId = req.user.id; // from JWT token after authentication

    if (!product_id || !rating)
      return res.status(400).json({ message: "product_id and rating are required" });

    if (typeof rating !== "number" || rating < 1 || rating > 5)
      return res.status(400).json({ message: "rating must be 1-5" });

    // Fetch user's name from database
    const [users] = await db.query("SELECT name FROM users WHERE id = ?", [userId]);
    if (!users.length) return res.status(404).json({ message: "User not found" });
    const author = users[0].name;

    const [result] = await db.query(
      "INSERT INTO reviews (product_id, author, rating, comment, user_id) VALUES (?, ?, ?, ?, ?)",
      [product_id, author, rating, comment || null, userId]
    );

    res.status(201).json({ id: result.insertId, product_id, author, rating, comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};



// PUT /api/reviews/:id
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, author, rating, comment } = req.body;

    const [reviews] = await db.query("SELECT * FROM reviews WHERE id = ?", [id]);
    if (reviews.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (product_id && product_id !== reviews[0].product_id) {
      return res
        .status(400)
        .json({ message: "You cannot change the product_id of a review" });
    }
    if (!author || !rating || rating > 5 || rating < 1) {
      return res
        .status(400)
        .json({ message: "author and rating(1-5) are required" });
    }
    const [result] = await db.query(
      "UPDATE reviews SET author = ?, rating = ?, comment = ? WHERE id = ?",
      [author, rating, comment, id]
    );

    res.status(200).json({
      id,
      product_id: reviews[0].product_id, // unchanged
      author,
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

