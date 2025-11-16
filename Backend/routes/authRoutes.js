import express from "express";
import { registerUser, loginUser, refreshToken, logoutUser } from "../controllers/authController.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", logoutUser);

export default router;
