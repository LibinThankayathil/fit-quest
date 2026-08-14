import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../lib/jwt";

const ACCESS_TOKEN_COOKIE = "accessToken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies[ACCESS_TOKEN_COOKIE];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub };
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
