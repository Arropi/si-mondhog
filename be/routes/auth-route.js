import { Router } from "express";
import { login } from "../controllers/auth-controller.js";
import { userValidation } from "../validations/user-validation.js";

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login or registration
 *     description: |
 *       Endpoint untuk login atau registrasi user. 
 *       - Jika email belum terdaftar, sistem akan membuat user baru (status 201)
 *       - Jika email sudah terdaftar, sistem akan login user (status 200)
 *       - Email harus menggunakan domain @mail.ugm.ac.id atau @ugm.ac.id
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nama lengkap user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email dengan domain UGM (@mail.ugm.ac.id atau @ugm.ac.id)
 *                 example: john.doe@mail.ugm.ac.id
 *     responses:
 *       200:
 *         description: Login berhasil - User sudah terdaftar sebelumnya
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successfully"
 *                 token:
 *                   type: string
 *                   description: JWT token untuk autentikasi
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTFmMGMyZTFiMmMzZDRlNWY2Nzg5MCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA5ODIwMDAwLCJleHAiOjE3MDk5MDY0MDB9.xxx"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       201:
 *         description: User berhasil dibuat - Registrasi user baru
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 token:
 *                   type: string
 *                   description: JWT token untuk autentikasi
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTFmMGMyZTFiMmMzZDRlNWY2Nzg5MCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA5ODIwMDAwLCJleHAiOjE3MDk5MDY0MDB9.xxx"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - Validasi gagal atau input tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               emailEmpty:
 *                 summary: Email kosong
 *                 value:
 *                   message: "Field Email Cannot Be Empty"
 *               usernameEmpty:
 *                 summary: Username kosong
 *                 value:
 *                   message: "Field Username Cannot Be Empty"
 *               invalidEmail:
 *                 summary: Email bukan domain UGM
 *                 value:
 *                   message: "Invalid email, please using ugm email"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/login", userValidation, login);

export default router;
