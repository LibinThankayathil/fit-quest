import type { CookieOptions, NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service";
import type { AuthenticatedRequest } from "../types/express.d";
import { ACCESS_TOKEN_COOKIE } from "../utils/constants";
import { sendError, sendSuccess } from "../utils/response";
import { loginSchema, registerSchema } from "../validators/auth.validator";

const accessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

const formatValidationErrors = (
  issues: { path: PropertyKey[]; message: string }[],
) =>
  issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return sendError(
      res,
      400,
      "Validation failed",
      formatValidationErrors(result.error.issues),
    );
  }

  try {
    const { user, accessToken } = await authService.register(result.data);
    res.cookie(ACCESS_TOKEN_COOKIE, accessToken, accessTokenCookieOptions);
    return sendSuccess(res, 201, { user });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return sendError(
      res,
      400,
      "Validation failed",
      formatValidationErrors(result.error.issues),
    );
  }

  try {
    const authResult = await authService.login(result.data);

    if (!authResult) {
      return sendError(res, 401, "Invalid email or password");
    }

    res.cookie(ACCESS_TOKEN_COOKIE, authResult.accessToken, accessTokenCookieOptions);
    return sendSuccess(res, 200, { user: authResult.user });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // req.user is guaranteed non-null here because the `authenticate`
    // middleware runs before this handler. We cast to AuthenticatedRequest
    // to make that contract explicit without a ! assertion.
    const { id } = (req as AuthenticatedRequest).user;
    const user = await authService.getCurrentUser(id);

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    return sendSuccess(res, 200, { user });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.clearCookie(ACCESS_TOKEN_COOKIE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return sendSuccess(res, 200, { message: "Logged out successfully" });
};

