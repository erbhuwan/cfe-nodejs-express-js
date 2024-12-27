import express from "express";
import { getUserProfile, loginUser, registerUser } from "./authControllers.js";
import { authMiddleware } from "./authMiddleware.js";

const router = express.Router();

// auth routes
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, getUserProfile);

export default router;
