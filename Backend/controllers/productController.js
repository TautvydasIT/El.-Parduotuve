import db from "../db/db.js";

// GET /api/products
export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT p.*, t.name AS type_name FROM products p LEFT JOIN types t ON p.type_id = t.id"
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { brand, name, type_id, price, description } = req.body;

    // Validate required fields
    if (
      !name ||
      !type_id ||
      !brand ||
      price === undefined ||
      typeof name !== "string" ||
      typeof brand !== "string" ||
      typeof type_id !== "number" ||
      typeof price !== "number"
    ) {
      return res
        .status(400)
        .json({ message: "brand, product name, type_id, and price are required" });
    }

    const [result] = await db.query(
      "INSERT INTO products (brand, type_id, name, price, description) VALUES (?, ?, ?, ?, ?)",
      [brand, type_id, name, price, description || null]
    );

    res.status(201).json({
      id: result.insertId,
      brand,
      name,
      type_id,
      price,
      description: description || null,
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ message: "Product with this name and brand already exists" });
    }
    res.status(500).json({ error: err.message });
  }
};


// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const { brand, name, type_id, price, description } = req.body;
    const { id } = req.params;

    // Validate required fields
    if (
      typeof brand !== "string" ||
      typeof name !== "string" ||
      typeof type_id !== "number" ||
      typeof price !== "number"
    ) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Fetch the product to ensure it exists
    const [products] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    if (products.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product
    const [result] = await db.query(
      "UPDATE products SET name = ?, brand = ?, type_id = ?, price = ?, description = ? WHERE id = ?",
      [name, brand, type_id, price, description || null, id]
    );

    res.status(200).json({
      id,
      name,
      brand,
      type_id,
      price,
      description: description || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM products WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Product not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};