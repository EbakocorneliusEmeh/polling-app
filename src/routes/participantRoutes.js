// src/routes/participantRoutes.js
import express from "express";
import { joinSessionController } from "../controllers/participantController.js";

const router = express.Router();

// Join a session with code
router.post("/:sessionCode/join", joinSessionController);

export default router;
