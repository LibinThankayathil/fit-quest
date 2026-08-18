import { axiosClient } from './axiosClient';
import type { LeaderboardResponse, LeaderboardTimeframe } from '../types/leaderboard';

export const leaderboardApi = {
  getLeaderboard: async (timeframe: LeaderboardTimeframe = 'this_month'): Promise<LeaderboardResponse> => {
    const response = await axiosClient.get<{ success: boolean; data: LeaderboardResponse }>(
      '/leaderboard',
      {
        params: { timeframe },
      }
    );
    return response.data.data;
  },
};
