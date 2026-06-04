import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createDebugNote,
  getDebugNotes,
  getDebugNoteById,
  updateDebugNote,
  deleteDebugNote,
} from "../controllers/debugNoteController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createDebugNote);
router.get("/", getDebugNotes);
router.get("/:id", getDebugNoteById);
router.put("/:id", updateDebugNote);
router.delete("/:id", deleteDebugNote);

export default router;