import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

const DEFAULT_PASSWORD = "password123";

/**
 * Scoring engine — mirrors the production rules exactly.
 * The seed calls this instead of hardcoding points, so test data never drifts
 * out of sync with the real scoring logic.
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
      // value is total seconds; floor to whole minutes first
      return Math.floor(value / 60) * 15;
    case "GYM":
      // value is total seconds; floor to whole minutes first
      return Math.floor(value / 60) * 5;
    case "DAILY_STEPS":
      // floor to nearest 100 steps
      return Math.floor(value / 100) * 1;
  }
}

async function seed() {
  console.log("🌱 Seeding database...");

  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 12);

  await prisma.activity.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({
    data: { firstName: "Alice", lastName: "Johnson", email: "alice@example.com", passwordHash },
  });

  const bob = await prisma.user.create({
    data: { firstName: "Bob", lastName: "Smith", email: "bob@example.com", passwordHash },
  });

  const carol = await prisma.user.create({
    data: { firstName: "Carol", lastName: "Williams", email: "carol@example.com", passwordHash },
  });

  const dave = await prisma.user.create({
    data: { firstName: "Dave", lastName: "Brown", email: "dave@example.com", passwordHash },
  });

  // value for SWIMMING/GYM is stored in seconds in the seed to match the
  // API contract (duration in seconds), but points are calculated per minute.
  const activitiesInput = [
    { userId: alice.id, sport: "RUNNING" as const,      unit: "KM" as const,      value: 5.2   },  // 520 pts
    { userId: alice.id, sport: "CYCLING" as const,      unit: "KM" as const,      value: 15.0  },  // 375 pts
    { userId: alice.id, sport: "DAILY_STEPS" as const,  unit: "STEPS" as const,   value: 10500 },  // 105 pts
    { userId: bob.id,   sport: "SWIMMING" as const,     unit: "MINUTES" as const, value: 2700  },  // 45 min → 675 pts
    { userId: bob.id,   sport: "GYM" as const,          unit: "MINUTES" as const, value: 3600  },  // 60 min → 300 pts
    { userId: bob.id,   sport: "RUNNING" as const,      unit: "KM" as const,      value: 8.0   },  // 800 pts
    { userId: carol.id, sport: "WALKING" as const,      unit: "KM" as const,      value: 3.5   },  // 175 pts
    { userId: carol.id, sport: "CYCLING" as const,      unit: "KM" as const,      value: 25.0  },  // 625 pts
    { userId: carol.id, sport: "DAILY_STEPS" as const,  unit: "STEPS" as const,   value: 12300 },  // 123 pts
    { userId: carol.id, sport: "SWIMMING" as const,     unit: "MINUTES" as const, value: 1800  },  // 30 min → 450 pts
    { userId: dave.id,  sport: "GYM" as const,          unit: "MINUTES" as const, value: 5400  },  // 90 min → 450 pts
    { userId: dave.id,  sport: "RUNNING" as const,      unit: "KM" as const,      value: 10.0  },  // 1000 pts
  ];

  for (const activity of activitiesInput) {
    await prisma.activity.create({
      data: {
        ...activity,
        points: calculatePoints(activity.sport, activity.value),
      },
    });
  }

  console.log(`✅ Seeded ${4} users and ${activitiesInput.length} activities.`);
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
