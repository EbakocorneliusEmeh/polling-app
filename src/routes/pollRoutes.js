// src/routes/pollRoutes.js
import express from "express";
import {
  createPollController,
  getPollsController,
  updatePollStatusController,
  deletePollController,
  submitResponseController,   // ✅ import it
} from "../controllers/pollController.js";

const router = express.Router();

/**
 * Poll Routes
 * Base path should be something like: /api/sessions
 *
 * Example:
 * POST   /api/sessions/:sessionCode/polls                -> Create a poll
 * GET    /api/sessions/:sessionCode/polls                -> Get all polls in a session
 * PUT    /api/sessions/:sessionCode/polls/:pollId/status -> Update poll status
 * DELETE /api/sessions/:sessionCode/polls/:pollId        -> Delete poll
 * POST   /api/sessions/:sessionCode/polls/:pollId/responses -> Submit a response
 */

// ✅ Create poll
router.post("/:sessionCode/polls", createPollController);

// ✅ Get polls for session
router.get("/:sessionCode/polls", getPollsController);

// ✅ Update poll status
router.put("/:sessionCode/polls/:pollId/status", updatePollStatusController);

// ✅ Delete poll
router.delete("/:sessionCode/polls/:pollId", deletePollController);

// ✅ Submit participant response
router.post("/:sessionCode/polls/:pollId/responses", submitResponseController);

export default router;
