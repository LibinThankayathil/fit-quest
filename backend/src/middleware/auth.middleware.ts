import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../lib/jwt";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies["accessToken"];

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub };
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const optionalAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.cookies["accessToken"];
  if (token) {
    try {
      const payload = verifyAccessToken(token);
      req.user = { id: payload.sub };
    } catch {
      // Ignore invalid token for optional auth
    }
  }
  next();
};
