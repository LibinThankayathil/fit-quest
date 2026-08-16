import { MetricUnit, Sport } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { calculatePoints, getMetricCategory } from "../utils/scoring";
import type { CreateActivityInput } from "../validators/activity.validator";

const publicActivitySelect = {
  id: true,
  sport: true,
  unit: true,
  value: true,
  points: true,
  recordedAt: true,
  createdAt: true,
} as const;

/**
 * Extracts the raw numeric value and determines the storage unit
 * from validated input based on the sport's metric category.
 */
function extractMetric(input: CreateActivityInput): { value: number; unit: MetricUnit } {
  const category = getMetricCategory(input.sport);

  switch (category) {
    case "distance":
      return { value: input.distanceKm!, unit: MetricUnit.KM };
    case "duration":
      return { value: input.durationSeconds!, unit: MetricUnit.MINUTES };
    case "steps":
      return { value: input.steps!, unit: MetricUnit.STEPS };
  }
}

export async function createActivity(userId: string, input: CreateActivityInput) {
  const { value, unit } = extractMetric(input);
  const points = calculatePoints(input.sport, value);

  const activity = await prisma.activity.create({
    data: {
      userId,
      sport: input.sport,
      unit,
      value,
      points,
      ...(input.recordedAt ? { recordedAt: new Date(input.recordedAt) } : {}),
    },
    select: publicActivitySelect,
  });

  return activity;
}

export async function getUserActivities(userId: string) {
  return prisma.activity.findMany({
    where: { userId },
    orderBy: { recordedAt: "desc" },
    select: publicActivitySelect,
  });
}
