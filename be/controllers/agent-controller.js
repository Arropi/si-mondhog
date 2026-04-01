import {
  bootstrapService,
  validateActivation,
  metricsService,
  heartbeatService,
  getAgentDownloadSource
} from "../services/agent-service.js";
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function bootstrapAgent(req, res, next) {
  try {
    console.log("Bootstrap Agent called");
    console.log("Request body:", req.body);
    const data = req.body;
    const validateData = await validateActivation(data.activation_token);
    if (!validateData.isValid) {
      const error = new Error("Invalid activation token");
      error.statusCode = 403;
      throw error;
    }
    const { apiKey, updatedData } = await bootstrapService(
      validateData.id,
      data.specs,
    );
    res.status(200).json({
      api_key: apiKey,
      machine_id: validateData.id,
      interval: 60,
    });
  } catch (error) {
    next(error);
  }
}

export async function metricsAgent(req, res, next) {
  try {
    console.log("Metrics Agent called");
    console.log("Request body:", req.body);
    const data = req.body;
    const { _id } = req.machine;
    const newMetrics = await metricsService(data, _id);
    res.status(201).json(newMetrics);
  } catch (error) {
    next(error);
  }
}

export async function heartbeatAgent(req, res, next) {
  try {
    console.log("Heartbeat Agent called");
    console.log("Request body:", req.body);
    const { _id } = req.machine;
    const updatedData = await heartbeatService(_id);
    res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
}

export async function downloadAgent(req, res, next) {
  try {
    const { token } = req.params
    const source = getAgentDownloadSource(token)
    const filePath = path.resolve(__dirname, source.path)
    return res.download(filePath, source.filename)
  } catch (error) {
    next(error)
  }
}
