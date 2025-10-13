import express from "express";
import { getTypes, getType, createType, updateType, deleteType, getProductsByType } from "../controllers/typeController.js";

const router = express.Router();

router.get("/", getTypes);
router.get("/:id/products", getProductsByType)
router.get("/:id", getType);
router.post("/", createType);
router.put("/:id", updateType);
router.delete("/:id", deleteType);

export default router;
