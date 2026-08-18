import type { Activity, Sport } from '../types/activity';
import { SPORT_LABELS } from './scoring';

export interface FavoriteSportData {
  sport: Sport;
  label: string;
  count: number;
  percentage: number;
  metricLabel: string;
  metricValue: string;
}

export interface TrophyItem {
  id: string;
  title: string;
  subtitle: string;
  isUnlocked: boolean;
  sport?: Sport;
  type: 'run' | 'streak' | 'rank' | 'points';
}

/**
 * Calculates dynamic athlete level based on total points.
 * Level progression: 300 points per level.
 */
export function calculateAthleteLevel(totalPoints: number): number {
  if (totalPoints <= 0) return 1;
  return Math.floor(totalPoints / 300) + 1;
}

/**
 * Calculates dynamic division tier based on total points.
 */
export function calculateDivisionTier(totalPoints: number): string {
  if (totalPoints >= 10000) return 'Elite Division';
  if (totalPoints >= 5000) return 'Diamond Division';
  if (totalPoints >= 2500) return 'Gold Division';
  if (totalPoints >= 1000) return 'Silver Division';
  return 'Bronze Division';
}

/**
 * Formats points into compact display (e.g. 12,450 -> 12.4k, 850 -> 850).
 */
export function formatPointsCompact(points: number): string {
  if (points >= 1000) {
    const kValue = points / 1000;
    return `${kValue.toFixed(1).replace(/\.0$/, '')}k`;
  }
  return points.toLocaleString();
}

/**
 * Computes user's top/favorite sport, its percentage, and total lifetime metric.
 */
export function calculateFavoriteSport(activities: Activity[] = []): FavoriteSportData | null {
  if (!activities.length) return null;

  const counts: Partial<Record<Sport, number>> = {};
  const metrics: Partial<Record<Sport, number>> = {};

  for (const act of activities) {
    counts[act.sport] = (counts[act.sport] || 0) + 1;
    metrics[act.sport] = (metrics[act.sport] || 0) + act.value;
  }

  // Find sport with most logged workouts
  let topSport: Sport = activities[0].sport;
  let maxCount = 0;

  for (const sport of Object.keys(counts) as Sport[]) {
    const count = counts[sport] || 0;
    if (count > maxCount) {
      maxCount = count;
      topSport = sport;
    }
  }

  const total = activities.length;
  const percentage = Math.round((maxCount / total) * 100);
  const totalMetricVal = metrics[topSport] || 0;

  let metricLabel = 'LIFETIME DISTANCE';
  let metricValue = `${totalMetricVal.toFixed(1)} km`;

  if (topSport === 'GYM' || topSport === 'SWIMMING') {
    metricLabel = 'LIFETIME TIME';
    metricValue = `${Math.round(totalMetricVal)} min`;
  } else if (topSport === 'DAILY_STEPS') {
    metricLabel = 'LIFETIME STEPS';
    metricValue = `${Math.round(totalMetricVal).toLocaleString()} steps`;
  }

  return {
    sport: topSport,
    label: SPORT_LABELS[topSport] || topSport,
    count: maxCount,
    percentage,
    metricLabel,
    metricValue,
  };
}

/**
 * Computes dynamic status for milestone trophies in Trophy Cabinet.
 */
export function calculateTrophyStatus(
  activities: Activity[] = [],
  totalPoints = 0,
  streak = 0,
  userRank: number | null = null
): TrophyItem[] {
  const hasFirstActivity = activities.length >= 1;
  const firstActivityDate = hasFirstActivity
    ? new Date(activities[activities.length - 1].recordedAt || activities[activities.length - 1].createdAt)
    : null;
  const unlockedYear = firstActivityDate ? firstActivityDate.getFullYear() : new Date().getFullYear();

  const isStreakMastered = streak >= 7;
  const isTop10 = userRank !== null && userRank <= 10;
  const is1kPoints = totalPoints >= 1000;

  return [
    {
      id: 'first-activity',
      title: 'First Activity',
      subtitle: hasFirstActivity ? `Unlocked ${unlockedYear}` : 'Locked',
      isUnlocked: hasFirstActivity,
      type: 'run',
    },
    {
      id: '7-day-streak',
      title: '7 Day Streak',
      subtitle: isStreakMastered ? 'Mastered' : `${streak}/7 Days`,
      isUnlocked: isStreakMastered,
      type: 'streak',
    },
    {
      id: 'top-10',
      title: 'Top 10',
      subtitle: isTop10 ? 'Global Rank' : userRank ? `Rank #${userRank}` : 'Locked',
      isUnlocked: isTop10,
      type: 'rank',
    },
    {
      id: '1k-points',
      title: '1K Points',
      subtitle: is1kPoints ? 'Milestone' : `${totalPoints}/1,000 pts`,
      isUnlocked: is1kPoints,
      type: 'points',
    },
  ];
}

/**
 * Formats date into "Today", "Yesterday", or "Month Day" (e.g. Aug 18).
 */
export function formatRelativeActivityDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) return 'Today';

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isYesterday) return 'Yesterday';

  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}
