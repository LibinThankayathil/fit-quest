import { useQuery } from '@tanstack/react-query';
import { leaderboardApi } from '../api/leaderboard';
import type { LeaderboardTimeframe } from '../types/leaderboard';

export const LEADERBOARD_QUERY_KEY = 'leaderboard';

export function useLeaderboard(timeframe: LeaderboardTimeframe = 'this_month') {
  return useQuery({
    queryKey: [LEADERBOARD_QUERY_KEY, timeframe],
    queryFn: () => leaderboardApi.getLeaderboard(timeframe),
    staleTime: 1000 * 30, // 30 seconds fresh
  });
}
