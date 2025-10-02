
// src/routes/responseRoutes.js
import express from "express";
import { submitResponses } from "../controllers/responseController.js";

const router = express.Router();

// POST /api/sessions/:sessionCode/responses
router.post("/:sessionCode/responses", submitResponses);

export default router;
