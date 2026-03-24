import { Router } from "express";
import { getSummaryDashboard } from "../controllers/dashboard-controller.js";
import { dashboardSummaryValidation } from "../validations/dashboard-validation.js";

const router = Router()

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     description: |
 *       Mengambil ringkasan data dashboard yang terdiri dari:
 *       - Rata-rata metrics (cpu, ram, disk)
 *       - Peak metrics dan spesifikasi tertinggi machine
 *       - Distribusi status machine
 *       - Total jumlah machine
 *
 *       Jika query `date` tidak diberikan, data metrics akan menggunakan rentang 7 hari terakhir.
 *     tags: [Dashboard]
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
 *         description: Filter tanggal untuk summary metrics (format YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Data successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data successfully
 *                 datas:
 *                   $ref: '#/components/schemas/DashboardSummary'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/TokenRequired'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/summary', dashboardSummaryValidation, getSummaryDashboard)

// router.get('/logs')

export default router