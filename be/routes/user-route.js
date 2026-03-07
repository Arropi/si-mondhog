import { Router } from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import { userController } from "../controllers/user-controller.js";

const router = Router();

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/profile/:id", userController)

export default router