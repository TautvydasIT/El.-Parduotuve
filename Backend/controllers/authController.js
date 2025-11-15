import db from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Register new user
export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      return res.status(400).json({ message: "Email, password and username required" });

    // Check if user exists
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0)
      return res.status(409).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (email, password_hash, role, name) VALUES (?, ?, ?, ?)",
      [email, hashedPassword, "user", name]
    );

    res.status(201).json({ id: result.insertId, email, role: "user", name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
