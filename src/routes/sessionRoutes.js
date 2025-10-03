import express from "express";
import { protect } from "../middleware/authMiddleware.js"; 
import { createSession, getSessions, deleteSession } from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", protect, createSession);
router.get("/", protect, getSessions);
router.delete("/:id", protect, deleteSession);

export default router;
