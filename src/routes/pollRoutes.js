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

// src/routes/pollRoutes.js
import express from "express";
import {
  createPollController,
  getPollsController,
  updatePollStatusController,
} from "../controllers/pollController.js";

const router = express.Router();

// POST /api/sessions/:sessionCode/polls
router.post("/:sessionCode/polls", createPollController);

// GET /api/sessions/:sessionCode/polls
router.get("/:sessionCode/polls", getPollsController);

// PUT /api/sessions/polls/:pollId/status
router.put("/polls/:pollId/status", updatePollStatusController);

export default router;
