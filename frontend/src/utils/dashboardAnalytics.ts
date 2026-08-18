import type { Activity, Sport } from '../types/activity';
import { SPORT_LABELS } from './scoring';

export interface DayData {
  dayName: string;
  shortDate: string;
  points: number;
}

export interface ActivityMixItem {
  sport: Sport;
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export const SPORT_COLORS: Record<Sport, string> = {
  RUNNING: '#c3f400', // Electric Lime
  CYCLING: '#4ae183', // Vibrant Green
  WALKING: '#f8d8ff', // Soft Purple
  GYM: '#8e9379',     // Muted Slate
  SWIMMING: '#22d3ee', // Cyan
  DAILY_STEPS: '#fb923c', // Orange
};

/**
 * Calculates total points earned across all activities.
 */
export function calculateTotalPoints(activities: Activity[] = []): number {
  return activities.reduce((sum, act) => sum + act.points, 0);
}

/**
 * Computes weekly activity count and points earned in the current calendar week.
 */
export function calculateWeeklyStats(activities: Activity[] = []): {
  pointsThisWeek: number;
  countThisWeek: number;
  percentageChange: number;
} {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
  startOfWeek.setHours(0, 0, 0, 0);

  const startOfPrevWeek = new Date(startOfWeek);
  startOfPrevWeek.setDate(startOfWeek.getDate() - 7);

  let pointsThisWeek = 0;
  let countThisWeek = 0;
  let pointsPrevWeek = 0;

  for (const act of activities) {
    const actDate = new Date(act.recordedAt || act.createdAt);
    if (actDate >= startOfWeek) {
      pointsThisWeek += act.points;
      countThisWeek += 1;
    } else if (actDate >= startOfPrevWeek && actDate < startOfWeek) {
      pointsPrevWeek += act.points;
    }
  }

  let percentageChange = 12; // default positive trend indicator
  if (pointsPrevWeek > 0) {
    percentageChange = Math.round(((pointsThisWeek - pointsPrevWeek) / pointsPrevWeek) * 100);
  } else if (pointsThisWeek > 0) {
    percentageChange = 100;
  }

  return { pointsThisWeek, countThisWeek, percentageChange };
}

/**
 * Calculates consecutive active days streak.
 */
export function calculateStreak(activities: Activity[] = []): number {
  if (!activities.length) return 0;

  const activeDays = new Set<string>();
  for (const act of activities) {
    const date = new Date(act.recordedAt || act.createdAt);
    activeDays.add(date.toISOString().split('T')[0]);
  }

  let streak = 0;
  const checkDate = new Date();

  // Check if today has an activity
  const todayStr = checkDate.toISOString().split('T')[0];
  const hasToday = activeDays.has(todayStr);

  if (!hasToday) {
    // Check if yesterday was active
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0];
    if (activeDays.has(dateStr)) {
      streak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak > 0 ? streak : hasToday ? 1 : 0;
}

/**
 * Computes 7-day points distribution for the Points Over Time spline chart.
 */
export function calculate7DayPoints(activities: Activity[] = []): DayData[] {
  const result: DayData[] = [];
  const now = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString([], { weekday: 'short' });

    const dayPoints = activities
      .filter((act) => {
        const actDateStr = new Date(act.recordedAt || act.createdAt).toISOString().split('T')[0];
        return actDateStr === dateStr;
      })
      .reduce((sum, act) => sum + act.points, 0);

    result.push({
      dayName,
      shortDate: `${d.getMonth() + 1}/${d.getDate()}`,
      points: dayPoints,
    });
  }

  return result;
}

/**
 * Computes the percentage breakdown of logged activities by sport.
 */
export function calculateActivityMix(activities: Activity[] = []): ActivityMixItem[] {
  if (!activities.length) {
    // Default preview mix if no activities recorded yet
    return [
      { sport: 'RUNNING', label: 'Running', count: 0, percentage: 45, color: SPORT_COLORS.RUNNING },
      { sport: 'CYCLING', label: 'Cycling', count: 0, percentage: 25, color: SPORT_COLORS.CYCLING },
      { sport: 'WALKING', label: 'Walking', count: 0, percentage: 20, color: SPORT_COLORS.WALKING },
      { sport: 'GYM', label: 'Gym', count: 0, percentage: 10, color: SPORT_COLORS.GYM },
    ];
  }

  const counts: Partial<Record<Sport, number>> = {};
  for (const act of activities) {
    counts[act.sport] = (counts[act.sport] || 0) + 1;
  }

  const total = activities.length;
  const items: ActivityMixItem[] = (Object.keys(counts) as Sport[]).map((sport) => {
    const count = counts[sport] || 0;
    const percentage = Math.round((count / total) * 100);
    return {
      sport,
      label: SPORT_LABELS[sport] || sport,
      count,
      percentage,
      color: SPORT_COLORS[sport] || '#c3f400',
    };
  });

  return items.sort((a, b) => b.percentage - a.percentage);
}

/**
 * Computes dynamic weekly quest progress (e.g. 5 activities weekly target).
 */
export function calculateQuestProgress(
  activitiesThisWeek: number,
  targetWeeklyCount = 5
): {
  progressPercentage: number;
  remainingCount: number;
  targetCount: number;
} {
  const remainingCount = Math.max(0, targetWeeklyCount - activitiesThisWeek);
  const progressPercentage = Math.min(100, Math.round((activitiesThisWeek / targetWeeklyCount) * 100));

  return {
    progressPercentage,
    remainingCount,
    targetCount: targetWeeklyCount,
  };
}
