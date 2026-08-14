import type { CookieOptions, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";
import * as authService from "../services/auth.service";
import { loginSchema, registerSchema } from "../validators/auth.validator";

const ACCESS_TOKEN_COOKIE = "accessToken";

const accessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

const formatValidationErrors = (issues: { path: PropertyKey[]; message: string }[]) =>
  issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));

const getDuplicateMessage = (error: Prisma.PrismaClientKnownRequestError) => {
  const target = error.meta?.target;

  if (Array.isArray(target)) {
    if (target.includes("email")) {
      return "A user with this email already exists";
    }

    if (target.includes("firstName") && target.includes("lastName")) {
      return "A user with this first and last name already exists";
    }
  }

  return "User already exists";
};

export const register = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: formatValidationErrors(result.error.issues),
    });
  }

  try {
    const { user, accessToken } = await authService.register(result.data);

    res.cookie(ACCESS_TOKEN_COOKIE, accessToken, accessTokenCookieOptions);

    return res.status(201).json({
      success: true,
      data: {
        userId: user.id,
        user,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        success: false,
        message: getDuplicateMessage(error),
      });
    }

    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: formatValidationErrors(result.error.issues),
    });
  }

  try {
    const authResult = await authService.login(result.data);

    if (!authResult) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.cookie(
      ACCESS_TOKEN_COOKIE,
      authResult.accessToken,
      accessTokenCookieOptions,
    );

    return res.status(200).json({
      success: true,
      data: {
        userId: authResult.user.id,
        user: authResult.user,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await authService.getCurrentUser(req.user!.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
