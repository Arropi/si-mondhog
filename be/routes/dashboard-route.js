import { Router } from "express";
import { getSummaryDashboard } from "../controllers/dashboard-controller.js";
import { dashboardSummaryValidation } from "../validations/dashboard-validation.js";

const router = Router()

router.get('/summary', dashboardSummaryValidation, getSummaryDashboard)

// router.get('/logs')

export default router