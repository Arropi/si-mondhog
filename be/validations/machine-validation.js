import z, { email, ZodError } from "zod";

export function machineCreateValidation(req, res, next) {
  try {
    z.object({
      hostname: z
        .string({
          error: (iss) =>
            iss.input === undefined
              ? "Field Hostname Cannot Be Empty"
              : "Invalid input on hostname",
        })
        .min(1, "Field Hostname Cannot Be Empty"),
      os: z.enum(["Windows", "Linux", "macOS"], {
        error: (iss) =>
          iss.input === undefined
            ? "Field OS Cannot Be Empty"
            : "Invalid input on OS",
      }),
      email: z
        .email({
          error: (iss) =>
            iss.input === undefined
              ? "Field Email Cannot Be Empty"
              : "Invalid input on email",
        })
        .min(1, "Field Email Cannot Be Empty"),
    }).parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const err = new Error(error.issues[0].message);
      err.statusCode = 400;
      next(err);
    } else {
      next(error);
    }
  }
}

export function machineUpdateValidation(req, res, next) {
  try {
    z.object({
      hostname: z
        .string({
          error: (iss) =>
            iss.input === undefined
              ? "Field Hostname Cannot Be Empty"
              : "Invalid input on hostname",
        })
        .min(1, "Field Hostname Cannot Be Empty"),
    }).parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const err = new Error(error.issues[0].message);
      err.statusCode = 400;
      next(err);
    } else {
      next(error);
    }
  }
}

export async function detailMachineValidation(req, res, next) {
  try {
    z.object({
      timeSeries: z.enum(["1h", "12h", "1d"]).optional({
        error: (iss) =>
          iss.input === undefined
            ? "Field Time Series Cannot Be Empty"
            : "Invalid input on time series",
      }),
    }).parse(req.query);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const err = new Error(error.issues[0].message);
      err.statusCode = 400;
      next(err);
    } else {
      next(error);
    }
  }
}
