import { Router } from "express";
import {
  createActivity,
  deleteActivity,
  getUserActivities,
} from "../controllers/activity.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, createActivity);
router.get("/", authenticate, getUserActivities);
router.delete("/:id", authenticate, deleteActivity);

export default router;
