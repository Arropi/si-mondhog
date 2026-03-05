import { Router } from "express";
import { login } from "../controllers/auth-controller.js";

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@mail.ugm.com
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: For get token to authenticate some endpoints.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "unique-jwt-token"
 *                 user:
 *                   type: object
 *                   example: { email: "user@mail.ugm.com", name: "John Doe", role: "user", _id: "64a1f0c2e1b2c3d4e5f67890" }
 *       400:
 *         description: Bad request, missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email"
 *       500:
 *          description: Internal server error.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Internal server error"
 */
router.post("/login", login);

export default router;
