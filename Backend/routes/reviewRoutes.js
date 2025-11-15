import express from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { authenticate, authorize, authorizeReviewDelete } from "../middleware/auth.js";


const router = express.Router();


router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.post("/",authenticate, authorize("user"), createReview);
router.put("/:id", authenticate, authorize("user"), updateReview);
router.delete("/:id", authenticate, authorizeReviewDelete, deleteReview);



export default router;