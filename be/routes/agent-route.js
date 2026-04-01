import { Router } from "express";
import { bootstrapAgent, metricsAgent, heartbeatAgent, downloadAgent } from "../controllers/agent-controller.js";
import agentMiddleware from "../middleware/agent-middleware.js";

const router = Router()

router.post("/bootstrap", bootstrapAgent)
router.get("/download/:token", downloadAgent)

router.post("/metrics", agentMiddleware, metricsAgent)
router.post("/heartbeat", agentMiddleware, heartbeatAgent)

export default router