// import express from "express";
// import { submitResponsesController } from "../controllers/responseController.js";

// const router = express.Router();

// router.post("/:sessionCode/responses", submitResponsesController);

// export default router;


// src/routes/responseRoutes.js
import express from "express";
import { submitResponses } from "../controllers/responseController.js";

const router = express.Router();

// POST /api/sessions/:sessionCode/responses
router.post("/:sessionCode/responses", submitResponses);

export default router;
