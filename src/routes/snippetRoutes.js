import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

import {
  createSnippet,
  getSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
  searchSnippets,
} from "../controllers/snippetController.js";

import {
  createSnippetSchema,
} from "../validations/snippetValidation.js";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createSnippetSchema),
  createSnippet
);

router.get("/", getSnippets);
router.get("/search", searchSnippets);
router.get("/:id", getSnippetById);
router.put("/:id", updateSnippet);
router.delete("/:id", deleteSnippet);

export default router;