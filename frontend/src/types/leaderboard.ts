export type LeaderboardTimeframe = 'this_week' | 'this_month' | 'all_time';

export interface RecentActivity {
  sport: string;
  label: string;
  recordedAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  points: number;
  activitiesCount: number;
  change: number; // positive = moved up, negative = moved down, 0 = no change
  recentActivity: RecentActivity | null;
  isCurrentUser: boolean;
  avatarUrl?: string;
}

export interface LeaderboardResponse {
  timeframe: LeaderboardTimeframe;
  leaderboard: LeaderboardEntry[];
  totalUsers: number;
  currentUser: LeaderboardEntry | null;
}
