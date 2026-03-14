import { Router } from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import { userController } from "../controllers/user-controller.js";

const router = Router();

/**
 * @swagger
 * /api/profile/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     description: |
 *       Mendapatkan detail profil user berdasarkan ID. 
 *       
 *       **Authentication Required:** Bearer token harus disertakan di header.
 *       
 *       **Permission Check:** User hanya bisa mengakses profil mereka sendiri. 
 *       ID dari token JWT harus sama dengan ID di parameter, jika tidak akan return 403 Forbidden.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (harus sama dengan ID di JWT token)
 *         example: "64a1f0c2e1b2c3d4e5f67890"
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User profile retrieved successfully"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *             example:
 *               message: "User profile retrieved successfully"
 *               user:
 *                 _id: "64a1f0c2e1b2c3d4e5f67890"
 *                 name: "John Doe"
 *                 email: "john.doe@mail.ugm.ac.id"
 *                 role: "user"
 *                 createdAt: "2024-01-15T10:30:00.000Z"
 *                 updatedAt: "2024-01-15T10:30:00.000Z"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/profile/:id", authMiddleware, userController)



export default router