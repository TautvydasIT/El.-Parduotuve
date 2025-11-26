import jwt from "jsonwebtoken";
import db from "../db/db.js";
const JWT_SECRET = process.env.JWT_SECRET;

// Verify token
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Role-based authorization
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!allowedRoles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
};

export const authorizeReviewDelete = async (req, res, next) => {

  const userId = req.user.id;
  const role = req.user.role;
  const reviewId = req.params.id;

  // Admin can always delete
  if (role === "admin") return next();

  // Otherwise check if this user owns the review
  const [reviews] = await db.query("SELECT * FROM reviews WHERE id = ?", [reviewId]);
  if (reviews.length === 0) return res.status(404).json({ message: "Review not found" });

  if (reviews[0].user_id !== userId) {
    return res.status(403).json({ message: "You are not allowed to delete this review" });
  }

  next();
};

