import { z, ZodError } from "zod";
export function userValidation(req, res, next) {
  try {
    const username = z
      .string({
        error: (iss) =>
          iss.input === undefined
            ? "Field Username Cannot Be Empty"
            : "Invalid input on username",
      })
      .parse(req.body.username);
    const email = z
      .email({
        error: (iss) =>
          iss.input === undefined
            ? "Field Email Cannot Be Empty"
            : "Invalid input on email",
      })
      .refine(
        (val) => val.endsWith("@mail.ugm.ac.id") || val.endsWith("@ugm.ac.id"),
        "Invalid email, please using ugm email"
      )
      .parse(req.body.email);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: error.issues[0].message,
      });
    } else {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}