import { Sport } from "../../generated/prisma/client";

/**
 * Valid sport-to-metric pairings, derived from the assignment specification:
 *
 *   Distance (km):  Running, Walking, Cycling
 *   Duration (sec): Swimming, Gym
 *   Count (steps):  Daily Steps
 */
const SPORT_METRIC_MAP = {
  [Sport.RUNNING]: "distance",
  [Sport.WALKING]: "distance",
  [Sport.CYCLING]: "distance",
  [Sport.SWIMMING]: "duration",
  [Sport.GYM]: "duration",
  [Sport.DAILY_STEPS]: "steps",
} as const;

export type MetricCategory = (typeof SPORT_METRIC_MAP)[Sport];

export function getMetricCategory(sport: Sport): MetricCategory {
  return SPORT_METRIC_MAP[sport];
}

/**
 * Computes normalized points for a given sport and raw metric value.
 *
 * Flooring rules (from the assignment spec):
 *
 *   Running:     floor(km × 100)
 *   Walking:     floor(km × 50)      — e.g. 1.55 km → 77.5 → 77 pts
 *   Cycling:     floor(km × 25)
 *   Swimming:    floor(seconds / 60) × 15  — duration floored to whole minutes first
 *   Gym:         floor(seconds / 60) × 5   — duration floored to whole minutes first
 *   Daily Steps: floor(steps / 100) × 1    — steps floored to nearest 100 first
 */
export function calculatePoints(sport: Sport, rawValue: number): number {
  switch (sport) {
    case Sport.RUNNING:
      return Math.floor(rawValue * 100);
    case Sport.WALKING:
      return Math.floor(rawValue * 50);
    case Sport.CYCLING:
      return Math.floor(rawValue * 25);
    case Sport.SWIMMING:
      return Math.floor(rawValue / 60) * 15;
    case Sport.GYM:
      return Math.floor(rawValue / 60) * 5;
    case Sport.DAILY_STEPS:
      return Math.floor(rawValue / 100);
  }
}
