import { Router } from "express";
import { downloadCSVDetail, downloadCSVEvent, downloadCSVPerformance } from "../controllers/csv-controller.js";
import { dashboardSummaryValidation } from "../validations/dashboard-validation.js";

const router = Router()

/**
 * @swagger
 * /api/csv/download/logs/performance:
 *   get:
 *     summary: Download performance logs as CSV
 *     description: |
 *       Mengunduh ringkasan performance logs dalam format CSV.
 *
 *       Jika query `date` tidak diberikan, data default akan menggunakan rentang 7 hari terakhir.
 *     tags: [CSV]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-01-15
 *         description: Filter tanggal untuk performance logs (format YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Performance CSV downloaded successfully
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/TokenRequired'
 *       500:
 *         description: Failed to download CSV
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to download
 */
router.get("/download/logs/performance", dashboardSummaryValidation, downloadCSVPerformance)

/**
 * @swagger
 * /api/csv/download/logs/events:
 *   get:
 *     summary: Download event logs as CSV
 *     description: |
 *       Mengunduh event logs dalam format CSV.
 *
 *       Jika query `date` tidak diberikan, data default akan menggunakan rentang 7 hari terakhir.
 *     tags: [CSV]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-01-15
 *         description: Filter tanggal untuk event logs (format YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Events CSV downloaded successfully
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/TokenRequired'
 *       500:
 *         description: Failed to download CSV
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to download
 */
router.get("/download/logs/events", dashboardSummaryValidation, downloadCSVEvent)

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
router.get('/download/:machineId', downloadCSVDetail)

export default router