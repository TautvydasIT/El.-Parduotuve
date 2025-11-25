import db from "../db/db.js";

// GET /api/types
export const getTypes = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM types");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/types/:typeId/products/:productId/reviews
export const getReviewsByProduct = async (req, res) => {
  const { typeId, productId } = req.params;

  try {
    // 1. Check if type exists
    const [typeResults] = await db.query(
      "SELECT * FROM types WHERE id = ?",
      [typeId]
    );
    if (typeResults.length === 0)
      return res.status(404).json({ message: "Type not found" });

    // 2. Check if product exists and belongs to this type
    const [productResults] = await db.query(
      "SELECT * FROM products WHERE id = ? AND type_id = ?",
      [productId, typeId]
    );

    if (productResults.length === 0)
      return res.status(404).json({ message: "Product not found in this type" });

    // 3. Fetch all reviews for this product
    const [reviewResults] = await db.query(
      `SELECT r.id, r.rating, r.comment, r.user_id, u.name AS user_name
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.product_id = ?`,
      [productId]
    );

    res.status(200).json(reviewResults);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET /api/types/:id
export const getType = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM types WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Type not found" });
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/types
export const createType = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    const [result] = await db.query("INSERT INTO types (name) VALUES (?)", [name]);
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
     if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({ message: "Type with this name already exists" });
  }
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/types/:id
export const updateType = async (req, res) => {
  try {
    const { name } = req.body;
    const id = req.params.id;
    if (!name) return res.status(400).json({ message: "Name required" });

    const [result] = await db.query("UPDATE types SET name = ? WHERE id = ?", [name, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Type not found" });
    res.status(200).json({ id, name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/types/:id
export const deleteType = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await db.query("DELETE FROM types WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Type not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductsByType = async (req, res) => {
  try {
    const typeId = req.params.id;

    // Check if the type exists
    const [typeRows] = await db.query("SELECT * FROM types WHERE id = ?", [typeId]);
    if (typeRows.length === 0)
      return res.status(404).json({ message: "Type not found" });

    // Get all products for that type
    const [products] = await db.query(
      "SELECT * FROM products WHERE type_id = ?",
      [typeId]
    );

    res.status(200).json({
      type: typeRows[0],
      products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};