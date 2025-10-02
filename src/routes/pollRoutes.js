// // src/routes/pollRoutes.js
// import express from "express";
// import {
//   createPollController,
//   getPollsController,
//   updatePollStatusController,
// } from "../controllers/pollController.js";

// const router = express.Router();

// // POST /api/sessions/:sessionCode/polls
// router.post("/:sessionCode/polls", createPollController);

// // GET /api/sessions/:sessionCode/polls
// router.get("/:sessionCode/polls", getPollsController);

// // PUT /api/sessions/polls/:pollId/status
// router.put("/polls/:pollId/status", updatePollStatusController);

// export default router;

// // src/routes/pollRoutes.js
// import express from "express";
// import {
//   createPollController,
//   getPollsController,
//   updatePollStatusController,
// } from "../controllers/pollController.js";

// const router = express.Router();

// // POST /api/sessions/:sessionCode/polls
// router.post("/:sessionCode/polls", createPollController);

// // GET /api/sessions/:sessionCode/polls
// router.get("/:sessionCode/polls", getPollsController);

// // PUT /api/sessions/polls/:pollId/status
// router.put("/polls/:pollId/status", updatePollStatusController);

// export default router;


// import express from "express";
// import {
//   createPollController,
//   getPollsController,
//   updatePollStatusController,
//   deletePollController,
// } from "../controllers/pollController.js";

// const router = express.Router();

// // POST /api/sessions/:sessionCode/polls
// router.post("/:sessionCode/polls", createPollController);

// // GET /api/sessions/:sessionCode/polls
// router.get("/:sessionCode/polls", getPollsController);

// // PUT /api/sessions/polls/:pollId/status
// router.put("/polls/:pollId/status", updatePollStatusController);

// // DELETE /api/sessions/polls/:pollId
// router.delete("/polls/:pollId", deletePollController);

// export default router;


// src/routes/pollRoutes.js
import express from "express";
import {
  createPollController,
  getPollsController,
  updatePollStatusController,
  deletePollController,
} from "../controllers/pollController.js";

const router = express.Router();

/**
 * Poll Routes
 * Base path should be something like: /api/sessions
 *
 * Example:
 * POST   /api/sessions/:sessionCode/polls       -> Create a poll
 * GET    /api/sessions/:sessionCode/polls       -> Get all polls in a session
 * PUT    /api/sessions/:sessionCode/polls/:id   -> Update poll status
 * DELETE /api/sessions/:sessionCode/polls/:id   -> Delete poll
 */

// Create poll
router.post("/:sessionCode/polls", createPollController);

// Get polls for session
router.get("/:sessionCode/polls", getPollsController);

// Update poll status
router.put("/:sessionCode/polls/:pollId/status", updatePollStatusController);

// Delete poll
router.delete("/:sessionCode/polls/:pollId", deletePollController);

export default router;
