// import express from "express";
// import { protect } from "../middleware/authMiddleware.js"; // use named export
// import { createSession, getSessions } from "../controllers/sessionController.js";

// const router = express.Router();

// // Only logged-in hosts can create sessions
// router.post("/", protect, createSession);

// // Only logged-in hosts can view their sessions
// router.get("/", protect, getSessions);

// export default router;



import express from "express";
import { protect } from "../middleware/authMiddleware.js"; 
import { createSession, getSessions, deleteSession } from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", protect, createSession);
router.get("/", protect, getSessions);
router.delete("/:id", protect, deleteSession);

export default router;
