import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

const DEFAULT_PASSWORD = "password123";

/**
 * Scoring engine — mirrors the production rules exactly.
 */
function calculatePoints(
  sport: "RUNNING" | "WALKING" | "CYCLING" | "SWIMMING" | "GYM" | "DAILY_STEPS",
  value: number,
): number {
  switch (sport) {
    case "RUNNING":
      return Math.floor(value * 100);
    case "WALKING":
      return Math.floor(value * 50);
    case "CYCLING":
      return Math.floor(value * 25);
    case "SWIMMING":
      return Math.floor(value / 60) * 15;
    case "GYM":
      return Math.floor(value / 60) * 5;
    case "DAILY_STEPS":
      return Math.floor(value / 100) * 1;
  }
}

async function seed() {
  console.log("🌱 Seeding FitQuest database with athletes & leaderboard data...");

  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 12);

  await prisma.activity.deleteMany();
  await prisma.user.deleteMany();

  const now = new Date();
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const fourDaysAgo = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000);
  const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
  const fifteenDaysAgo = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);

  // 1. Alex Rivers (Rank 1 - 12,450 pts)
  const alex = await prisma.user.create({
    data: { firstName: "Alex", lastName: "Rivers", email: "alex@fitquest.dev", passwordHash },
  });

  // 2. Sarah Connor (Rank 2 - 10,820 pts)
  const sarah = await prisma.user.create({
    data: { firstName: "Sarah", lastName: "Connor", email: "sarah@fitquest.dev", passwordHash },
  });

  // 3. John Miller (Rank 3 - 10,240 pts)
  const john = await prisma.user.create({
    data: { firstName: "John", lastName: "Miller", email: "john@fitquest.dev", passwordHash },
  });

  // 4. Emma Watson (Rank 4 - 9,850 pts)
  const emma = await prisma.user.create({
    data: { firstName: "Emma", lastName: "Watson", email: "emma@fitquest.dev", passwordHash },
  });

  // 5. David Kim (Rank 5 - 9,200 pts)
  const david = await prisma.user.create({
    data: { firstName: "David", lastName: "Kim", email: "david@fitquest.dev", passwordHash },
  });

  // 6. Mia Tanaka (Rank 6 - 8,950 pts)
  const mia = await prisma.user.create({
    data: { firstName: "Mia", lastName: "Tanaka", email: "mia@fitquest.dev", passwordHash },
  });

  // 7. Lucas Reed (Rank 7 - 8,600 pts)
  const lucas = await prisma.user.create({
    data: { firstName: "Lucas", lastName: "Reed", email: "lucas@fitquest.dev", passwordHash },
  });

  // 8. Demo User: Libin Thomas (Rank 8 - 8,450 pts)
  const libin = await prisma.user.create({
    data: { firstName: "Libin", lastName: "Thomas", email: "libin@fitquest.dev", passwordHash },
  });

  // 9. Olivia Parker (Rank 9 - 8,100 pts)
  const olivia = await prisma.user.create({
    data: { firstName: "Olivia", lastName: "Parker", email: "olivia@fitquest.dev", passwordHash },
  });

  // 10. Noah Hayes (Rank 10 - 7,920 pts)
  const noah = await prisma.user.create({
    data: { firstName: "Noah", lastName: "Hayes", email: "noah@fitquest.dev", passwordHash },
  });

  // 11. Sophia Lopez (Rank 11 - 7,450 pts)
  const sophia = await prisma.user.create({
    data: { firstName: "Sophia", lastName: "Lopez", email: "sophia@fitquest.dev", passwordHash },
  });

  // 12. Liam Murphy (Rank 12 - 6,800 pts)
  const liam = await prisma.user.create({
    data: { firstName: "Liam", lastName: "Murphy", email: "liam@fitquest.dev", passwordHash },
  });

  // Helper to create activity with custom points or auto calculation
  const athleteActivities = [
    // Alex (12,450 pts total)
    { userId: alex.id, sport: "RUNNING" as const, unit: "KM" as const, value: 10.0, points: 1000, recordedAt: now },
    { userId: alex.id, sport: "CYCLING" as const, unit: "KM" as const, value: 120.0, points: 3000, recordedAt: twoDaysAgo },
    { userId: alex.id, sport: "RUNNING" as const, unit: "KM" as const, value: 45.0, points: 4500, recordedAt: fourDaysAgo },
    { userId: alex.id, sport: "SWIMMING" as const, unit: "MINUTES" as const, value: 7200, points: 1800, recordedAt: tenDaysAgo },
    { userId: alex.id, sport: "GYM" as const, unit: "MINUTES" as const, value: 25800, points: 2150, recordedAt: fifteenDaysAgo },

    // Sarah (10,820 pts)
    { userId: sarah.id, sport: "RUNNING" as const, unit: "KM" as const, value: 12.0, points: 1200, recordedAt: now },
    { userId: sarah.id, sport: "CYCLING" as const, unit: "KM" as const, value: 100.0, points: 2500, recordedAt: twoDaysAgo },
    { userId: sarah.id, sport: "SWIMMING" as const, unit: "MINUTES" as const, value: 8400, points: 2100, recordedAt: fourDaysAgo },
    { userId: sarah.id, sport: "RUNNING" as const, unit: "KM" as const, value: 30.0, points: 3000, recordedAt: tenDaysAgo },
    { userId: sarah.id, sport: "GYM" as const, unit: "MINUTES" as const, value: 24240, points: 2020, recordedAt: fifteenDaysAgo },

    // John (10,240 pts)
    { userId: john.id, sport: "CYCLING" as const, unit: "KM" as const, value: 40.0, points: 1000, recordedAt: now },
    { userId: john.id, sport: "RUNNING" as const, unit: "KM" as const, value: 35.0, points: 3500, recordedAt: twoDaysAgo },
    { userId: john.id, sport: "GYM" as const, unit: "MINUTES" as const, value: 24000, points: 2000, recordedAt: fourDaysAgo },
    { userId: john.id, sport: "SWIMMING" as const, unit: "MINUTES" as const, value: 6000, points: 1500, recordedAt: tenDaysAgo },
    { userId: john.id, sport: "DAILY_STEPS" as const, unit: "STEPS" as const, value: 224000, points: 2240, recordedAt: fifteenDaysAgo },

    // Emma W. (9,850 pts - Recent: 10k Run)
    { userId: emma.id, sport: "RUNNING" as const, unit: "KM" as const, value: 10.0, points: 1000, recordedAt: now },
    { userId: emma.id, sport: "RUNNING" as const, unit: "KM" as const, value: 40.0, points: 4000, recordedAt: twoDaysAgo },
    { userId: emma.id, sport: "CYCLING" as const, unit: "KM" as const, value: 80.0, points: 2000, recordedAt: fourDaysAgo },
    { userId: emma.id, sport: "GYM" as const, unit: "MINUTES" as const, value: 34200, points: 2850, recordedAt: tenDaysAgo },

    // David K. (9,200 pts - Recent: Swim)
    { userId: david.id, sport: "SWIMMING" as const, unit: "MINUTES" as const, value: 3600, points: 900, recordedAt: now },
    { userId: david.id, sport: "SWIMMING" as const, unit: "MINUTES" as const, value: 12000, points: 3000, recordedAt: twoDaysAgo },
    { userId: david.id, sport: "RUNNING" as const, unit: "KM" as const, value: 30.0, points: 3000, recordedAt: fourDaysAgo },
    { userId: david.id, sport: "CYCLING" as const, unit: "KM" as const, value: 92.0, points: 2300, recordedAt: tenDaysAgo },

    // Mia T. (8,950 pts - Recent: Cycling)
    { userId: mia.id, sport: "CYCLING" as const, unit: "KM" as const, value: 25.0, points: 625, recordedAt: now },
    { userId: mia.id, sport: "CYCLING" as const, unit: "KM" as const, value: 120.0, points: 3000, recordedAt: twoDaysAgo },
    { userId: mia.id, sport: "RUNNING" as const, unit: "KM" as const, value: 35.0, points: 3500, recordedAt: fourDaysAgo },
    { userId: mia.id, sport: "GYM" as const, unit: "MINUTES" as const, value: 21900, points: 1825, recordedAt: tenDaysAgo },

    // Lucas R. (8,600 pts - Recent: Weights)
    { userId: lucas.id, sport: "GYM" as const, unit: "MINUTES" as const, value: 5400, points: 450, recordedAt: now },
    { userId: lucas.id, sport: "GYM" as const, unit: "MINUTES" as const, value: 36000, points: 3000, recordedAt: twoDaysAgo },
    { userId: lucas.id, sport: "RUNNING" as const, unit: "KM" as const, value: 28.0, points: 2800, recordedAt: fourDaysAgo },
    { userId: lucas.id, sport: "CYCLING" as const, unit: "KM" as const, value: 94.0, points: 2350, recordedAt: tenDaysAgo },

    // Libin Thomas (8,450 pts - Recent: HIIT)
    { userId: libin.id, sport: "GYM" as const, unit: "MINUTES" as const, value: 2700, points: 225, recordedAt: now },
    { userId: libin.id, sport: "RUNNING" as const, unit: "KM" as const, value: 35.0, points: 3500, recordedAt: twoDaysAgo },
    { userId: libin.id, sport: "CYCLING" as const, unit: "KM" as const, value: 80.0, points: 2000, recordedAt: fourDaysAgo },
    { userId: libin.id, sport: "SWIMMING" as const, unit: "MINUTES" as const, value: 6000, points: 1500, recordedAt: tenDaysAgo },
    { userId: libin.id, sport: "DAILY_STEPS" as const, unit: "STEPS" as const, value: 122500, points: 1225, recordedAt: fifteenDaysAgo },

    // Olivia P. (8,100 pts - Recent: 5k Run)
    { userId: olivia.id, sport: "RUNNING" as const, unit: "KM" as const, value: 5.0, points: 500, recordedAt: now },
    { userId: olivia.id, sport: "RUNNING" as const, unit: "KM" as const, value: 30.0, points: 3000, recordedAt: twoDaysAgo },
    { userId: olivia.id, sport: "CYCLING" as const, unit: "KM" as const, value: 100.0, points: 2500, recordedAt: fourDaysAgo },
    { userId: olivia.id, sport: "GYM" as const, unit: "MINUTES" as const, value: 25200, points: 2100, recordedAt: tenDaysAgo },

    // Noah H. (7,920 pts - Recent: Yoga / Gym)
    { userId: noah.id, sport: "GYM" as const, unit: "MINUTES" as const, value: 3600, points: 300, recordedAt: now },
    { userId: noah.id, sport: "SWIMMING" as const, unit: "MINUTES" as const, value: 9600, points: 2400, recordedAt: twoDaysAgo },
    { userId: noah.id, sport: "RUNNING" as const, unit: "KM" as const, value: 25.0, points: 2500, recordedAt: fourDaysAgo },
    { userId: noah.id, sport: "DAILY_STEPS" as const, unit: "STEPS" as const, value: 272000, points: 2720, recordedAt: tenDaysAgo },

    // Sophia L. (7,450 pts)
    { userId: sophia.id, sport: "RUNNING" as const, unit: "KM" as const, value: 25.0, points: 2500, recordedAt: twoDaysAgo },
    { userId: sophia.id, sport: "CYCLING" as const, unit: "KM" as const, value: 80.0, points: 2000, recordedAt: fourDaysAgo },
    { userId: sophia.id, sport: "GYM" as const, unit: "MINUTES" as const, value: 35400, points: 2950, recordedAt: tenDaysAgo },

    // Liam M. (6,800 pts)
    { userId: liam.id, sport: "RUNNING" as const, unit: "KM" as const, value: 20.0, points: 2000, recordedAt: twoDaysAgo },
    { userId: liam.id, sport: "CYCLING" as const, unit: "KM" as const, value: 80.0, points: 2000, recordedAt: fourDaysAgo },
    { userId: liam.id, sport: "SWIMMING" as const, unit: "MINUTES" as const, value: 11200, points: 2800, recordedAt: tenDaysAgo },
  ];

  for (const act of athleteActivities) {
    await prisma.activity.create({
      data: {
        userId: act.userId,
        sport: act.sport,
        unit: act.unit,
        value: act.value,
        points: act.points || calculatePoints(act.sport, act.value),
        recordedAt: act.recordedAt,
      },
    });
  }

  console.log(`✅ Seeded ${12} athletes and ${athleteActivities.length} activities matching design mockup.`);
  console.log(`   Default seed password: ${DEFAULT_PASSWORD}`);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
