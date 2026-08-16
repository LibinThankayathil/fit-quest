import type { ErrorRequestHandler } from "express";
import { Prisma } from "../../generated/prisma/client";
import { AppError } from "../utils/AppError";

/**
 * Global Express error-handling middleware.
 *
 * Must be registered as the LAST `app.use()` in app.ts (after all routes).
 * Express identifies error handlers by their 4-argument signature (err, req, res, next).
 *
 * Handles:
 *   - AppError  → custom HTTP status + message
 *   - Prisma P2002 (unique constraint) → 409 Conflict
 *   - Everything else → 500 Internal Server Error (message never leaked)
 */
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // Typed application errors — thrown deliberately by services/controllers
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  // Prisma unique-constraint violation (P2002)
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    const target = err.meta?.target;
    let message = "A record with this value already exists";

    if (Array.isArray(target)) {
      if (target.includes("email")) {
        message = "A user with this email already exists";
      } else if (target.includes("firstName") && target.includes("lastName")) {
        message = "A user with this first and last name already exists";
      }
    }

    res.status(409).json({ success: false, message });
    return;
  }

  // Unknown / unexpected errors — log internally, never expose internals
  console.error("[Unhandled Error]", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
