/**
 * Typed application error.
 *
 * Throw this anywhere in the service or controller layer; the global error
 * middleware (`error.middleware.ts`) will catch it and convert it into the
 * correct JSON response shape without leaking stack traces.
 *
 * @example
 *   throw new AppError(404, "Activity not found");
 *   throw new AppError(409, "Email already exists");
 */
export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
    // Maintains proper stack trace in V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}
