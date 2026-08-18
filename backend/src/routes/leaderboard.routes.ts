import { Router } from "express";
import { getLeaderboardHandler } from "../controllers/leaderboard.controller";
import { optionalAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", optionalAuth, getLeaderboardHandler);

export default router;
