import { Router } from "express";
import { downloadCSV } from "../controllers/csv-controller.js";

const router = Router()

/**
 * @swagger
 * /api/csv/download/{machineId}:
 *   get:
 *     summary: Download machine metrics as CSV
 *     description: |
 *       Mengunduh data metrics machine dalam format CSV untuk 7 hari terakhir.
 *       Request ini membutuhkan autentikasi karena user ID digunakan untuk mencatat riwayat download.
 *     tags: [CSV]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: machineId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID machine yang akan diunduh metrics-nya
 *         example: 64a1f0c2e1b2c3d4e5f67890
 *     responses:
 *       200:
 *         description: CSV file downloaded successfully
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/TokenRequired'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Failed to download CSV
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to download
 */
router.get('/download/:machineId', downloadCSV)

export default router