// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import authRoutes from "./src/routes/authRoutes.js";
import sessionRoutes from "./src/routes/sessionRoutes.js";
import pollRoutes from "./src/routes/pollRoutes.js";


dotenv.config();
const app = express();

// Enable CORS
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes); // session routes
app.use("/api/sessions", pollRoutes);    // poll routes nested under sessions
app.use("/api", pollRoutes);


// Test database URL
console.log("DATABASE_URL =", process.env.DATABASE_URL);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
