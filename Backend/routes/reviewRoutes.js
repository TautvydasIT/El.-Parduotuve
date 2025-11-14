import express from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  //likeReview,
 // dislikeReview
} from "../controllers/reviewController.js";

const router = express.Router();


router.get("/", getAllReviews);
router.get("/:id", getReviewById);
//router.post("/:id/like", likeReview);
//router.post("/:id/dislike", dislikeReview);
router.post("/", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);



export default router;