import { describe, it, expect } from "vitest";
import { Sport } from "../generated/prisma/client";
import { calculatePoints, getMetricCategory } from "../src/utils/scoring";

describe("Scoring Utility", () => {
  describe("getMetricCategory", () => {
    it("should return distance for running, walking, and cycling", () => {
      expect(getMetricCategory(Sport.RUNNING)).toBe("distance");
      expect(getMetricCategory(Sport.WALKING)).toBe("distance");
      expect(getMetricCategory(Sport.CYCLING)).toBe("distance");
    });

    it("should return duration for swimming and gym", () => {
      expect(getMetricCategory(Sport.SWIMMING)).toBe("duration");
      expect(getMetricCategory(Sport.GYM)).toBe("duration");
    });

    it("should return steps for daily steps", () => {
      expect(getMetricCategory(Sport.DAILY_STEPS)).toBe("steps");
    });
  });

  describe("calculatePoints", () => {
    it("should calculate points for Running (floor(km * 100))", () => {
      expect(calculatePoints(Sport.RUNNING, 5.0)).toBe(500);
      expect(calculatePoints(Sport.RUNNING, 5.25)).toBe(525);
      expect(calculatePoints(Sport.RUNNING, 10.339)).toBe(1033);
    });

    it("should calculate points for Walking (floor(km * 50))", () => {
      expect(calculatePoints(Sport.WALKING, 2.0)).toBe(100);
      expect(calculatePoints(Sport.WALKING, 1.55)).toBe(77);
    });

    it("should calculate points for Cycling (floor(km * 25))", () => {
      expect(calculatePoints(Sport.CYCLING, 10.0)).toBe(250);
      expect(calculatePoints(Sport.CYCLING, 15.5)).toBe(387);
    });

    it("should calculate points for Swimming (floor(seconds / 60) * 15)", () => {
      expect(calculatePoints(Sport.SWIMMING, 1800)).toBe(450); // 30 mins * 15
      expect(calculatePoints(Sport.SWIMMING, 1859)).toBe(450); // 30 mins 59s floored to 30 mins
    });

    it("should calculate points for Gym (floor(seconds / 60) * 5)", () => {
      expect(calculatePoints(Sport.GYM, 3600)).toBe(300); // 60 mins * 5
      expect(calculatePoints(Sport.GYM, 2700)).toBe(225); // 45 mins * 5
    });

    it("should calculate points for Daily Steps (floor(steps / 100))", () => {
      expect(calculatePoints(Sport.DAILY_STEPS, 10000)).toBe(100);
      expect(calculatePoints(Sport.DAILY_STEPS, 8450)).toBe(84);
      expect(calculatePoints(Sport.DAILY_STEPS, 99)).toBe(0);
    });
  });
});
