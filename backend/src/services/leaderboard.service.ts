import { prisma } from "../lib/prisma";

export type LeaderboardTimeframe = "this_week" | "this_month" | "all_time";

export interface RecentActivityDto {
  sport: string;
  label: string;
  recordedAt: string;
}

export interface LeaderboardEntryDto {
  rank: number;
  userId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  points: number;
  activitiesCount: number;
  recentActivity: RecentActivityDto | null;
  isCurrentUser: boolean;
}

/**
 * Formats a sport and value into a human-readable display label matching UI design
 */
function formatRecentActivityLabel(sport: string, value: number): string {
  switch (sport) {
    case "RUNNING":
      if (value >= 9.5 && value <= 10.5) return "10k Run";
      if (value >= 4.5 && value <= 5.5) return "5k Run";
      return `${value >= 1 ? Math.round(value) : value.toFixed(1)}k Run`;
    case "CYCLING":
      return "Cycling";
    case "SWIMMING":
      return "Swim";
    case "GYM":
      return value >= 60 ? "Weights" : "HIIT";
    case "WALKING":
      return "Walk";
    case "DAILY_STEPS":
      return "Steps";
    default:
      return sport;
  }
}

/**
 * Computes the date boundary for the given timeframe.
 */
function getTimeframeStartDate(timeframe: LeaderboardTimeframe): Date | null {
  const now = new Date();
  if (timeframe === "this_week") {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  }
  if (timeframe === "this_month") {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0);
    return startOfMonth;
  }
  return null;
}

/**
 * Retrieves the global leaderboard rankings for the specified timeframe.
 */
export async function getGlobalLeaderboard(
  timeframe: LeaderboardTimeframe = "this_month",
  currentUserId?: string,
) {
  const startDate = getTimeframeStartDate(timeframe);

  // Fetch all users with their activities in the selected timeframe
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      activities: {
        where: startDate ? { recordedAt: { gte: startDate } } : undefined,
        orderBy: { recordedAt: "desc" },
        select: {
          id: true,
          sport: true,
          unit: true,
          value: true,
          points: true,
          recordedAt: true,
        },
      },
    },
  });

  // Calculate points and format entries
  const rankedUsers = users.map((user) => {
    const totalPoints = user.activities.reduce((sum, act) => sum + act.points, 0);
    const latestActivity = user.activities[0];

    const displayName =
      user.lastName && user.lastName.length > 0
        ? `${user.firstName} ${user.lastName[0]}.`
        : user.firstName;

    return {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName,
      points: totalPoints,
      activitiesCount: user.activities.length,
      recentActivity: latestActivity
        ? {
            sport: latestActivity.sport,
            label: formatRecentActivityLabel(latestActivity.sport, latestActivity.value),
            recordedAt: latestActivity.recordedAt.toISOString(),
          }
        : null,
      isCurrentUser: Boolean(currentUserId && user.id === currentUserId),
    };
  });

  // Sort descending by points (secondary by activitiesCount)
  rankedUsers.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.activitiesCount - a.activitiesCount;
  });

  // Assign 1-indexed ranks
  const leaderboard: LeaderboardEntryDto[] = rankedUsers.map((entry, index) => ({
    rank: index + 1,
    ...entry,
  }));

  const currentUserEntry = currentUserId
    ? leaderboard.find((item) => item.userId === currentUserId) || null
    : null;

  return {
    timeframe,
    leaderboard,
    totalUsers: leaderboard.length,
    currentUser: currentUserEntry,
  };
}
