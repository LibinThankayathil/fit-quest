import type { Request, Response, NextFunction } from "express";
import { getGlobalLeaderboard, type LeaderboardTimeframe } from "../services/leaderboard.service";

export async function getLeaderboardHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const rawTimeframe = req.query.timeframe as string;
    let timeframe: LeaderboardTimeframe = "this_month";
    if (rawTimeframe === "this_week" || rawTimeframe === "this_month" || rawTimeframe === "all_time") {
      timeframe = rawTimeframe;
    }

    const currentUserId = req.user?.id;
    const data = await getGlobalLeaderboard(timeframe, currentUserId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}
