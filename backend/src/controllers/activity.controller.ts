import type { NextFunction, Request, Response } from "express";
import * as activityService from "../services/activity.service";
import type { AuthenticatedRequest } from "../types/express.d";
import { sendError, sendSuccess } from "../utils/response";
import { createActivitySchema } from "../validators/activity.validator";

const formatValidationErrors = (
  issues: { path: PropertyKey[]; message: string }[],
) =>
  issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));

export const createActivity = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = createActivitySchema.safeParse(req.body);

  if (!result.success) {
    return sendError(
      res,
      400,
      "Validation failed",
      formatValidationErrors(result.error.issues),
    );
  }

  try {
    const { id: userId } = (req as AuthenticatedRequest).user;
    const activity = await activityService.createActivity(userId, result.data);

    return sendSuccess(res, 201, { activity });
  } catch (error) {
    next(error);
  }
};
