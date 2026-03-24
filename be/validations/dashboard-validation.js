import { z, ZodError } from "zod";

export async function dashboardSummaryValidation (req, res, next) {
  try {
    z.object({
      date: z
        .coerce
        .date({
            error: (iss) =>
                iss.message = "Invalid input on Date"
        })
        .optional()
        .refine((value) => {
          if (!value) return true;

          const now = new Date();
          const sevenDaysAgo = new Date(
            now.getTime() - 7 * 24 * 60 * 60 * 1000
          );

          return value >= sevenDaysAgo && value <= now;
        }, {
          message: "Date must be within last 7 days"
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