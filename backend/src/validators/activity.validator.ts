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
    // Sport must match one of the predefined Prisma enum values
    sport: z.nativeEnum(Sport),

    // Metric fields are defined as optional in the base object schema
    // because their presence is conditionally enforced in superRefine() below
    distanceKm: z.number().positive("distanceKm must be greater than 0").optional(),
    durationSeconds: z.number().positive("durationSeconds must be greater than 0").optional(),
    steps: z.number().int("steps must be a whole number").positive("steps must be greater than 0").optional(),

    // Optional ISO 8601 timestamp for logging past activities (defaults to current time if omitted)
    recordedAt: z.string().datetime("recordedAt must be a valid ISO 8601 date").optional(),
  })
  .superRefine((data, ctx) => {
    const distanceSports: Sport[] = [Sport.RUNNING, Sport.WALKING, Sport.CYCLING];
    const durationSports: Sport[] = [Sport.SWIMMING, Sport.GYM];

    // --- 1. Distance-based Sports (Running, Walking, Cycling) ---
    // Requires distanceKm; rejects durationSeconds and steps
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

    // --- 2. Duration-based Sports (Swimming, Gym) ---
    // Requires durationSeconds; rejects distanceKm and steps
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

    // --- 3. Step-count Sports (Daily Steps) ---
    // Requires steps; rejects distanceKm and durationSeconds
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

// Inferred TypeScript type representing the validated request payload
export type CreateActivityInput = z.infer<typeof createActivitySchema>;
