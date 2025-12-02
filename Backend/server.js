import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import typeRoutes from "./routes/typeRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://frontend-production-0a56.up.railway.app",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/types", typeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));