import express from "express";
import validate from "../middleware/validate.js";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createProjectSchema,
} from "../validations/projectValidation.js";

import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} from "../controllers/projectController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validate(createProjectSchema),createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;