// src/routes/sessionRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createSession, getSessions } from "../controllers/sessionController.js";

const router = express.Router();

// Only logged-in hosts can create sessions
router.post("/", authMiddleware, createSession);

// Only logged-in hosts can view their sessions
router.get("/", authMiddleware, getSessions);

export default router;
