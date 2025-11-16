import db from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET;

// Helpers ---------------------

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "5m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, type: "refresh" },
    JWT_SECRET,
    { expiresIn: "2d" }
  );
};

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

// ------------------------------

// Register
export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      return res.status(400).json({ message: "Email, password and username required" });

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

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const refreshHash = hashToken(refreshToken);

    await db.query(
      `INSERT INTO sessions (user_id, refresh_token_hash, expires_at) 
       VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 2 DAY))`,
      [user.id, refreshHash]
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REFRESH TOKEN (ROTATION)
export const refreshToken = async (req, res) => {
  try {
    const oldToken = req.cookies.refreshToken;
    if (!oldToken) return res.status(401).json({ message: "No refresh token" });

    // Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(oldToken, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    if (decoded.type !== "refresh") {
      return res.status(401).json({ message: "Invalid token type" });
    }

    const oldHash = hashToken(oldToken);

    const [sessions] = await db.query(
      `SELECT * FROM sessions 
       WHERE refresh_token_hash = ? AND isRevoked = FALSE 
       AND expires_at > NOW()`,
      [oldHash]
    );

    if (sessions.length === 0) {
      // Revoke session if token is invalid or replayed
      await db.query(
        "UPDATE sessions SET isRevoked = TRUE WHERE refresh_token_hash = ?",
        [oldHash]
      );
      res.clearCookie("refreshToken");
      return res.status(403).json({ message: "Session expired or invalid" });
    }

    const session = sessions[0];

    // ROTATE refresh token
    const [users] = await db.query("SELECT * FROM users WHERE id = ?", [session.user_id]);
    const user = users[0];
    const newRefreshToken = generateRefreshToken(user);
    const newHash = hashToken(newRefreshToken);

    await db.query(
      `UPDATE sessions 
       SET refresh_token_hash = ?, expires_at = DATE_ADD(NOW(), INTERVAL 2 DAY)
       WHERE id = ?`,
      [newHash, session.id]
    );

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    // Generate new access token
    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGOUT
export const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(200).json({ message: "Logged out" });

    const hash = hashToken(token);

    await db.query(
      "UPDATE sessions SET isRevoked = TRUE WHERE refresh_token_hash = ?",
      [hash]
    );

    res.clearCookie("refreshToken");

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
