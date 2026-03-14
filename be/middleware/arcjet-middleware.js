import { createArcjet } from '../config/arcjet.js';

export async function arcjetMiddleware(req, res, next) {
    const aj = createArcjet(process.env.ARCJET_KEY);
  try {
    const decision = await aj.protect(req, { requested: 3 });
    console.log("Arcjet decision:", decision);
    let err;

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        err = new Error("Too many requests")
        err.statusCode = 429
        throw err
      } else if (decision.reason.isBot()) {
        err = new Error("No bots allowed")
        err.statusCode = 403
        throw err
      } else {
        err = new Error("Forbidden")
        err.statusCode = 403
        throw err
      }
    }
    next()
  } catch (error) {
    console.error("Error in Arcjet middleware:", error);
    next(error);
  }
};

