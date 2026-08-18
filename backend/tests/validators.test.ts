import { describe, it, expect } from "vitest";
import { Sport } from "../generated/prisma/client";
import { registerSchema, loginSchema } from "../src/validators/auth.validator";
import { createActivitySchema } from "../src/validators/activity.validator";

describe("Validation Schemas", () => {
  describe("registerSchema", () => {
    it("should accept valid registration data", () => {
      const result = registerSchema.safeParse({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        password: "password123",
      });
      expect(result.success).toBe(true);
    });

    it("should reject password less than 8 characters", () => {
      const result = registerSchema.safeParse({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        password: "short",
      });
      expect(result.success).toBe(false);
    });

    it("should reject invalid email format", () => {
      const result = registerSchema.safeParse({
        firstName: "Jane",
        lastName: "Doe",
        email: "not-an-email",
        password: "password123",
      });
      expect(result.success).toBe(false);
    });

    it("should reject empty first or last name", () => {
      const result = registerSchema.safeParse({
        firstName: "",
        lastName: "Doe",
        email: "jane@example.com",
        password: "password123",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("loginSchema", () => {
    it("should accept valid login data", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "secretpassword",
      });
      expect(result.success).toBe(true);
    });

    it("should reject empty password", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("createActivitySchema", () => {
    it("should accept valid distance-based activity (RUNNING)", () => {
      const result = createActivitySchema.safeParse({
        sport: Sport.RUNNING,
        distanceKm: 5.2,
      });
      expect(result.success).toBe(true);
    });

    it("should reject distance sports with durationSeconds or steps", () => {
      const result = createActivitySchema.safeParse({
        sport: Sport.RUNNING,
        distanceKm: 5.0,
        durationSeconds: 1800,
      });
      expect(result.success).toBe(false);
    });

    it("should accept valid duration-based activity (GYM)", () => {
      const result = createActivitySchema.safeParse({
        sport: Sport.GYM,
        durationSeconds: 3600,
      });
      expect(result.success).toBe(true);
    });

    it("should accept valid steps-based activity (DAILY_STEPS)", () => {
      const result = createActivitySchema.safeParse({
        sport: Sport.DAILY_STEPS,
        steps: 8000,
      });
      expect(result.success).toBe(true);
    });

    it("should reject DAILY_STEPS with non-integer or negative steps", () => {
      const resultFloat = createActivitySchema.safeParse({
        sport: Sport.DAILY_STEPS,
        steps: 8000.5,
      });
      expect(resultFloat.success).toBe(false);

      const resultNeg = createActivitySchema.safeParse({
        sport: Sport.DAILY_STEPS,
        steps: -100,
      });
      expect(resultNeg.success).toBe(false);
    });
  });
});
