import jwt from "jsonwebtoken";
import db from "../db/db.js";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET;

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "5m" }
  );
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

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let accessToken;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    accessToken = authHeader.split(" ")[1];
  }

  // 1️⃣ TRY VERIFY ACCESS TOKEN
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (err) {
      // access token expired → try refresh
    }
  }

  // 2️⃣ NO ACCESS TOKEN OR EXPIRED → TRY REFRESH TOKEN
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let decodedRefresh;
  try {
    decodedRefresh = jwt.verify(refreshToken, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Refresh token invalid" });
  }

  if (decodedRefresh.type !== "refresh") {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  // 3️⃣ Validate refresh token session in DB
  const hashed = hashToken(refreshToken);
  const [sessions] = await db.query(
    `SELECT * FROM sessions 
     WHERE refresh_token_hash = ? 
       AND isRevoked = FALSE
       AND expires_at > NOW()`,
    [hashed]
  );

  if (sessions.length === 0) {
    return res.status(403).json({ message: "Session expired" });
  }

  const session = sessions[0];

  // 4️⃣ Load user
  const [users] = await db.query("SELECT * FROM users WHERE id = ?", [
    session.user_id,
  ]);
  const user = users[0];

  // 5️⃣ Rotate refresh token
  const newRefresh = generateRefreshToken(user);
  const newHash = hashToken(newRefresh);

  await db.query(
    `UPDATE sessions 
       SET refresh_token_hash = ?, expires_at = DATE_ADD(NOW(), INTERVAL 2 DAY)
     WHERE id = ?`,
    [newHash, session.id]
  );

  res.cookie("refreshToken", newRefresh, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });

  // 6️⃣ Issue new access token
  const newAccess = generateAccessToken(user);

  // Set new access token in header so client can use it on API calls
  res.setHeader("X-Access-Token", newAccess);

  // Attach to request
  req.user = { id: user.id, role: user.role };

  next();
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

