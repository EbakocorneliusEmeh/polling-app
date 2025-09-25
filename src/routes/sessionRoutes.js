import express from "express";
import { protect } from "../middleware/authMiddleware.js"; // use named export
import { createSession, getSessions } from "../controllers/sessionController.js";

const router = express.Router();

// Only logged-in hosts can create sessions
router.post("/", protect, createSession);

// Only logged-in hosts can view their sessions
router.get("/", protect, getSessions);

export default router;
