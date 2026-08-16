import { Router } from "express";
import {
  createActivity,
  getUserActivities,
} from "../controllers/activity.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, createActivity);
router.get("/", authenticate, getUserActivities);

export default router;
