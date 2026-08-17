export type Sport = 'RUNNING' | 'WALKING' | 'CYCLING' | 'SWIMMING' | 'GYM' | 'DAILY_STEPS';

export type MetricUnit = 'KM' | 'MINUTES' | 'STEPS';

export interface Activity {
  id: string;
  sport: Sport;
  unit: MetricUnit;
  value: number;
  points: number;
  recordedAt: string;
  createdAt: string;
}

export interface CreateActivityPayload {
  sport: Sport;
  distanceKm?: number;
  durationSeconds?: number;
  steps?: number;
  recordedAt?: string;
}

export interface ActivitiesResponse {
  success: boolean;
  data: {
    activities: Activity[];
  };
}

export interface SingleActivityResponse {
  success: boolean;
  data: {
    activity: Activity;
  };
}
