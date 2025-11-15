import express from "express";
import { getTypes, getType, createType, updateType, deleteType, getProductsByType } from "../controllers/typeController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTypes);
router.get("/:id/products", getProductsByType)
router.get("/:id", getType);
router.post("/", authenticate, authorize("admin"), createType);
router.put("/:id", authenticate, authorize("admin"), updateType);
router.delete("/:id", authenticate, authorize("admin"), deleteType);

export default router;
