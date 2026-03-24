import { Router } from 'express'
import { 
    addMachine, 
    deleteMachine, 
    getMachineById, 
    getMachines, 
    updateMachine 
} from '../controllers/machine-controller.js'
import { 
    detailMachineValidation, 
    machineCreateValidation, 
    machineUpdateValidation 
} from '../validations/machine-validation.js'

const router = Router()

/**
 * @swagger
 * /api/devices:
 *   get:
 *     summary: Get paginated machines
 *     description: |
 *       Mengambil daftar machine dengan pagination dan status machine (Pending, Online, Offline).
 *       
 *       Jika query `search` kosong atau tidak dikirim, endpoint akan mengembalikan semua dokumen sesuai pagination.
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Nomor halaman
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Jumlah data per halaman
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *           default: ""
 *         description: Pencarian hostname (case-insensitive, partial match)
 *         example: LAB-PC
 *     responses:
 *       200:
 *         description: Machines retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Machines retrieved successfully
 *                 datas:
 *                   type: object
 *                   properties:
 *                     machines:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Machine'
 *                     stats:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           online:
 *                             type: integer
 *                             example: 5
 *                           offline:
 *                             type: integer
 *                             example: 2
 *                           pending:
 *                             type: integer
 *                             example: 1
 *                     totalMachines:
 *                       type: integer
 *                       example: 24
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/TokenRequired'
 *       404:
 *         description: Tidak ada machine ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: No machines found
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/", getMachines)

/**
 * @swagger
 * /api/devices/{_id}:
 *   get:
 *     summary: Get machine by ID with logs and metrics
 *     description: Mengambil detail machine, 10 log terbaru, metrics time series, dan highest stats.
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID machine
 *         example: 64a1f0c2e1b2c3d4e5f67890
 *       - in: query
 *         name: timeSeries
 *         required: false
 *         schema:
 *           type: string
 *           enum: [1h, 12h, 1d]
 *           default: 1h
 *         description: Grouping periode untuk data metrics
 *     responses:
 *       200:
 *         description: Machine retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Machine retrieved successfully
 *                 datas:
 *                   type: object
 *                   properties:
 *                     machine:
 *                       $ref: '#/components/schemas/Machine'
 *                     logs:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         $ref: '#/components/schemas/MachineLog'
 *                     metrics:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         $ref: '#/components/schemas/MachineMetric'
 *                     highestStats:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         $ref: '#/components/schemas/MachineHighestStats'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/TokenRequired'
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               machineNotFound:
 *                 summary: Data machine tidak ditemukan
 *                 value:
 *                   message: Machine not found
 *               invalidObjectId:
 *                 summary: Format ID tidak valid
 *                 value:
 *                   message: Resource not found
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/:_id", detailMachineValidation, getMachineById)

/**
 * @swagger
 * /api/devices:
 *   post:
 *     summary: Add new machine
 *     description: Menambahkan machine baru, mengembalikan activation token mentah, dan mengirim token ke email.
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hostname
 *               - os
 *               - email
 *             properties:
 *               hostname:
 *                 type: string
 *                 example: LAB-PC-01
 *               os:
 *                 type: string
 *                 enum: [Windows, Linux, macOS]
 *                 example: Linux
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@mail.ugm.ac.id
 *     responses:
 *       201:
 *         description: Machine added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Machine added successfully
 *                 machine:
 *                   $ref: '#/components/schemas/MachineCreatedResponse'
 *       400:
 *         description: Validation error - field missing atau tipe/value tidak sesuai
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               hostnameMissing:
 *                 summary: Hostname tidak dikirim
 *                 value:
 *                   message: Field Hostname Cannot Be Empty
 *               osMissing:
 *                 summary: OS tidak dikirim
 *                 value:
 *                   message: Field OS Cannot Be Empty
 *               hostnameInvalidType:
 *                 summary: Tipe hostname tidak sesuai
 *                 value:
 *                   message: Invalid input on hostname
 *               osInvalidValue:
 *                 summary: Nilai OS tidak sesuai enum
 *                 value:
 *                   message: Invalid input on OS
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/TokenRequired'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/", machineCreateValidation, addMachine)

/**
 * @swagger
 * /api/devices/{_id}:
 *   put:
 *     summary: Update machine
 *     description: Update data machine berdasarkan ID. Minimal satu field (`hostname` atau `os`) harus dikirim.
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID machine
 *         example: 64a1f0c2e1b2c3d4e5f67890
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hostname:
 *                 type: string
 *                 example: LAB-PC-01-UPDATED
 *               os:
 *                 type: string
 *                 enum: [Windows, Linux, macOS]
 *                 example: Windows
 *     responses:
 *       200:
 *         description: Machine updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Machine updated successfully
 *                 machine:
 *                   $ref: '#/components/schemas/Machine'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               noFieldProvided:
 *                 summary: Body kosong atau tidak ada field valid
 *                 value:
 *                   message: At least one field must be provided
 *               invalidOsTypeOrValue:
 *                 summary: Tipe data atau nilai os tidak valid
 *                 value:
 *                   message: Invalid option
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/TokenRequired'
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               machineNotFound:
 *                 summary: Data machine tidak ditemukan
 *                 value:
 *                   message: Machine not found
 *               invalidObjectId:
 *                 summary: Format ID tidak valid
 *                 value:
 *                   message: Resource not found
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put("/:_id", machineUpdateValidation, updateMachine)

/**
 * @swagger
 * /api/devices/{_id}:
 *   delete:
 *     summary: Delete machine
 *     description: Menghapus machine berdasarkan ID.
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID machine
 *         example: 64a1f0c2e1b2c3d4e5f67890
 *     responses:
 *       200:
 *         description: Machine deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Machine deleted successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/TokenRequired'
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               machineNotFound:
 *                 summary: Data machine tidak ditemukan
 *                 value:
 *                   message: Machine not found
 *               invalidObjectId:
 *                 summary: Format ID tidak valid
 *                 value:
 *                   message: Resource not found
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete("/:_id", deleteMachine)
export default router