export type SportType = 'RUNNING' | 'WALKING' | 'CYCLING' | 'SWIMMING' | 'GYM' | 'DAILY_STEPS';

export type MetricCategory = 'distance' | 'duration' | 'steps';

export const SPORT_METRIC_MAP: Record<SportType, MetricCategory> = {
  RUNNING: 'distance',
  WALKING: 'distance',
  CYCLING: 'distance',
  SWIMMING: 'duration',
  GYM: 'duration',
  DAILY_STEPS: 'steps',
};

export const SPORT_LABELS: Record<SportType, string> = {
  RUNNING: 'Running',
  WALKING: 'Walking',
  CYCLING: 'Cycling',
  SWIMMING: 'Swimming',
  GYM: 'Gym',
  DAILY_STEPS: 'Daily Steps',
};

/**
 * Computes points based on the FitQuest scoring formula:
 * - Running: floor(km * 100)
 * - Walking: floor(km * 50)
 * - Cycling: floor(km * 25)
 * - Swimming: floor(duration_seconds / 60) * 15 -> floor(minutes) * 15
 * - Gym: floor(duration_seconds / 60) * 5 -> floor(minutes) * 5
 * - Daily Steps: floor(steps / 100) * 1
 */
export function calculateSportPoints(
  sport: SportType,
  values: {
    distanceKm?: number;
    durationMinutes?: number;
    steps?: number;
  }
): number {
  switch (sport) {
    case 'RUNNING':
      return values.distanceKm && values.distanceKm > 0 ? Math.floor(values.distanceKm * 100) : 0;
    case 'WALKING':
      return values.distanceKm && values.distanceKm > 0 ? Math.floor(values.distanceKm * 50) : 0;
    case 'CYCLING':
      return values.distanceKm && values.distanceKm > 0 ? Math.floor(values.distanceKm * 25) : 0;
    case 'SWIMMING':
      return values.durationMinutes && values.durationMinutes > 0
        ? Math.floor(values.durationMinutes) * 15
        : 0;
    case 'GYM':
      return values.durationMinutes && values.durationMinutes > 0
        ? Math.floor(values.durationMinutes) * 5
        : 0;
    case 'DAILY_STEPS':
      return values.steps && values.steps > 0 ? Math.floor(values.steps / 100) : 0;
    default:
      return 0;
  }
}
