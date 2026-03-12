import z, { ZodError } from "zod";

export function machineCreateValidation(req, res, next) {
    try {
        z.object({
            hostname: z.string({
                error: (iss) =>
                    iss.input === undefined
                        ? "Field Hostname Cannot Be Empty"
                        : "Invalid input on hostname",
            }).min(1, "Field Hostname Cannot Be Empty"),
            os: z.enum(["Windows", "Linux", "macOS"], {
                error: (iss) =>
                    iss.input === undefined
                        ? "Field OS Cannot Be Empty"
                        : "Invalid input on OS",
            }),
        }).nonEmpty("Field cannot be empty").parse(req.body);
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
            hostname: z.string().optional(),
            os: z.enum(["Windows", "Linux", "macOS"]).optional(),
        }).refine((data) => {
            return Object.keys(data).length > 0;
        }, "At least one field must be provided").parse(req.body);
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