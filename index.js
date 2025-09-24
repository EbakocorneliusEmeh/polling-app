import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import sessionRoutes from "./src/routes/sessionRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());



app.use(express.json());

// Mount session routes correctly
app.use("/api/sessions", sessionRoutes);

// Routes
app.use("/api/auth", authRoutes);

console.log("DATABASE_URL =", process.env.DATABASE_URL);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
