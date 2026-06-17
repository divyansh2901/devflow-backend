import express from "express";
import validate from "../middleware/validate.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    registerUser,
    loginUser,
    getMe
} from "../controllers/authController.js";

import {
  registerSchema,
  loginSchema,
} from "../validations/authValidation.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register",validate(registerSchema),registerUser);
router.post("/login",validate(loginSchema),loginUser);

router.get("/me",authMiddleware,getMe);   // protected route

export default router;