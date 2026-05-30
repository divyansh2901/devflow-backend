import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default authMiddleware;
