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