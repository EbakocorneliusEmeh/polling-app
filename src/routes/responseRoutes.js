
// src/routes/responseRoutes.js
import express from "express";
import { submitResponses, getSessionResponses } from "../controllers/responseController.js";

const router = express.Router();

// POST /api/sessions/:sessionCode/responses
router.post("/:sessionCode/responses", submitResponses);

// GET /api/sessions/:sessionCode/submissions
router.get("/:sessionCode/submissions", getSessionResponses);

export default router;

