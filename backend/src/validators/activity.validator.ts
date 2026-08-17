import { z } from "zod";
import { Sport } from "../../generated/prisma/client";

/**
 * Validates the POST /api/activities request body.
 *
 * Sport determines which metric field is required:
 *   - RUNNING, WALKING, CYCLING  → distanceKm (positive number, in km)
 *   - SWIMMING, GYM              → durationSeconds (positive number, in seconds)
 *   - DAILY_STEPS                → steps (positive integer)
 *
 * Mismatched metric fields are rejected with a 400 error.
 */
export const createActivitySchema = z
  .object({
    sport: z.nativeEnum(Sport),
    distanceKm: z.number().positive("distanceKm must be greater than 0").optional(),
    durationSeconds: z.number().positive("durationSeconds must be greater than 0").optional(),
    steps: z.number().int("steps must be a whole number").positive("steps must be greater than 0").optional(),
    recordedAt: z.string().datetime("recordedAt must be a valid ISO 8601 date").optional(),
  })
  .superRefine((data, ctx) => {
    const distanceSports: Sport[] = [Sport.RUNNING, Sport.WALKING, Sport.CYCLING];
    const durationSports: Sport[] = [Sport.SWIMMING, Sport.GYM];

    if (distanceSports.includes(data.sport)) {
      if (data.distanceKm === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["distanceKm"],
          message: `${data.sport} requires distanceKm (in km)`,
        });
      }
      if (data.durationSeconds !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["durationSeconds"],
          message: `durationSeconds is not applicable for ${data.sport}`,
        });
      }
      if (data.steps !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["steps"],
          message: `steps is not applicable for ${data.sport}`,
        });
      }
    }

    if (durationSports.includes(data.sport)) {
      if (data.durationSeconds === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["durationSeconds"],
          message: `${data.sport} requires durationSeconds (in seconds)`,
        });
      }
      if (data.distanceKm !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["distanceKm"],
          message: `distanceKm is not applicable for ${data.sport}`,
        });
      }
      if (data.steps !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["steps"],
          message: `steps is not applicable for ${data.sport}`,
        });
      }
    }

    if (data.sport === Sport.DAILY_STEPS) {
      if (data.steps === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["steps"],
          message: "DAILY_STEPS requires steps (positive integer)",
        });
      }
      if (data.distanceKm !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["distanceKm"],
          message: "distanceKm is not applicable for DAILY_STEPS",
        });
      }
      if (data.durationSeconds !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["durationSeconds"],
          message: "durationSeconds is not applicable for DAILY_STEPS",
        });
      }
    }
  });

export type CreateActivityInput = z.infer<typeof createActivitySchema>;
