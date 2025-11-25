import express from "express";
import { registerUser, loginUser, refreshToken, logoutUser, getCurrentUser } from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js"; 
const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", logoutUser);
router.get("/me", authenticate, getCurrentUser);

export default router;
