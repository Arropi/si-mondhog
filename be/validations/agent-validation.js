import z, { ZodError } from "zod";

export function bootstrapAgentValidation(req, res, next) {
    try {
        const { activation_token, specs } = req.body;
        if (!activation_token || !specs) {
            const error = new Error("Missing required fields");
            error.statusCode = 400;
            throw error;
        }
        z.object({
            cpu_cores: z.number({
                error: (iss) =>
                    iss.input === undefined
                        ? "Field cpu_cores Cannot Be Empty"
                        : "Invalid input on cpu_cores",
            }),
            total_ram_gb: z.number({
                error: (iss) =>
                    iss.input === undefined
                        ? "Field total_ram_gb Cannot Be Empty"
                        : "Invalid input on total_ram_gb",
            }),
            total_disk_gb: z.number({
                error: (iss) =>
                    iss.input === undefined
                        ? "Field total_disk_gb Cannot Be Empty"
                        : "Invalid input on total_disk_gb",
            })
        }).parse(specs);
        z.string({
            error: (iss) =>
                iss.input === undefined
                    ? "Field activation_token Cannot Be Empty"
                    : "Invalid input on activation_token",
        }).min(1, "Field activation_token Cannot Be Empty").parse(activation_token);
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

export function metricsAgentValidation(req, res, next) {
    try {
        const { cpu_percent, ram_percent, disk_percent } = req.body;
        z.object({
            cpu_percent: z.number({
                error: (iss) =>
                    iss.input === undefined
                        ? "Field cpu_percent Cannot Be Empty"
                        : "Invalid input on cpu_percent",
            }),
            ram_percent: z.number({
                error: (iss) =>
                    iss.input === undefined
                        ? "Field ram_percent Cannot Be Empty"
                        : "Invalid input on ram_percent",
            }).max(100, "Field ram_percent must be less than or equal to 100"),
            disk_percent: z.number({
                error: (iss) =>
                    iss.input === undefined
                        ? "Field disk_percent Cannot Be Empty"
                        : "Invalid input on disk_percent",
            }).max(100, "Field disk_percent must be less than or equal to 100"),
        }).parse({ cpu_percent, ram_percent, disk_percent });
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