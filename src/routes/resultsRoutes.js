// src/routes/resultsRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js"; 
import { getSubmissions, publishResults } from "../controllers/resultsController.js";

const router = express.Router();

// Debug log to confirm this file is loaded
console.log("✅ resultsRoutes loaded");

// Host fetches all submissions
router.get("/:sessionCode/submissions", protect, (req, res, next) => {
  console.log("➡️ GET submissions route hit for:", req.params.sessionCode);
  next(); // pass to controller
}, getSubmissions);

// Host publishes results
router.post("/:sessionCode/publish", protect, (req, res, next) => {
  console.log("➡️ POST publish route hit for:", req.params.sessionCode);
  next();
}, publishResults);

export default router;
