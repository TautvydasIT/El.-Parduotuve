import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import typeRoutes from "./routes/typeRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/types", typeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));