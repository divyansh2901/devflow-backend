import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"

import {
    createSnippet,
    getSnippets,
    getSnippetById,
    updateSnippet,
    deleteSnippet
} from "../controllers/snippetController.js"

const router = express.Route();

router.use(authMiddleware);

router.post("/", createSnippet);
router.get("/", getSnippets);
router.get("/:id", getSnippetById);
router.put("/:id", updateSnippet);
router.delete("/:id", deleteSnippet);

export default router;
