import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

import {
  createDebugNote,
  getDebugNotes,
  getDebugNoteById,
  updateDebugNote,
  deleteDebugNote,
} from "../controllers/debugNoteController.js";

import {
  createDebugNoteSchema,
} from "../validations/debugNoteValidation.js";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createDebugNoteSchema),
  createDebugNote
);

router.get("/", getDebugNotes);

router.get("/:id", getDebugNoteById);

router.put("/:id", updateDebugNote);

router.delete("/:id", deleteDebugNote);

export default router;