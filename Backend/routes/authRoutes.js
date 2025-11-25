import express from "express";
import { registerUser, loginUser, refreshToken, logoutUser, getCurrentUser } from "../controllers/authController.js";
import { authorize } from "../middleware/auth.js"; 
const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", logoutUser);
router.get("/me", authorize, getCurrentUser);

export default router;
