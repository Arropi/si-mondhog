import { Router } from "express";
import { downloadCSV } from "../controllers/csv-controller.js";

const router = Router()

router.get('/download/:machineId', downloadCSV)

export default router