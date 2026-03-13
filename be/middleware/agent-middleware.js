import { createHash, timingSafeEqual} from "crypto";
import { getMachineByApiKey } from "../repositories/machine-repositories.js";

export default async function agentMiddleware(req, res, next) {
  try {
    const { authorization } = req.headers;
    let error;
    if (!authorization) {
      error = new Error("Token needed");
      error.status = 403;
      throw error;
    }
    const token = authorization.split(" ")[1];
    const hashedToken = createHash("sha256").update(token).digest("hex");
    const machine = await getMachineByApiKey(hashedToken);
    console.log(machine);
    if (!machine) {
      error = new Error("Invalid token");
      error.status = 403;
      throw error;
    }
    if (!timingSafeEqual(Buffer.from(hashedToken), Buffer.from(machine.hashApiKey))) {
      error = new Error("Invalid token");
      error.status = 403;
      throw error;
    }
    req.machine = machine;
    next();
  } catch (error) {
    next(error);
  }
}
