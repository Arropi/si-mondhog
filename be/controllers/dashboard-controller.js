import { getSummaryDashboardService } from "../services/dashboard-service.js";

export async function getSummaryDashboard(req, res, next){
    try {
        const { date } = req.query
        const datas = await getSummaryDashboardService(date)
        res.status(200).json({
            "message": "Data successfully",
            "datas": datas
        })
    } catch (error) {
        next(error);
    }
}
