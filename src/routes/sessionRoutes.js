import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
    createSession,
    getSessions,
    getSessionById,
    deleteSession,
    getSessionsByProject,
} from "../controllers/sessionController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createSession);
router.get("/", getSessions);
router.get("/:id", getSessionById);
router.delete("/:id", deleteSession);
router.get("/project/:projectId", getSessionsByProject);

export default router;