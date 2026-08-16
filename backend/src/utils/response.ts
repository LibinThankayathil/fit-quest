import type { Response } from "express";

/**
 * Send a successful JSON response in the standard FitQuest envelope.
 *
 * @example
 *   return sendSuccess(res, 201, { user });
 */
export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  data: T,
): void => {
  res.status(statusCode).json({ success: true, data });
};

/**
 * Send an error JSON response in the standard FitQuest envelope.
 *
 * @example
 *   return sendError(res, 409, "Email already registered");
 *   return sendError(res, 400, "Validation failed", validationErrors);
 */
export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: { field: string; message: string }[],
): void => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && errors.length > 0 ? { errors } : {}),
  });
};
