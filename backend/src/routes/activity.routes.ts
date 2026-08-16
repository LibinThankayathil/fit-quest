import { Router } from "express";
import { createActivity } from "../controllers/activity.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, createActivity);

export default router;
