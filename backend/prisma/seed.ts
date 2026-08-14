import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

const DEFAULT_PASSWORD = "password123";

async function seed() {
  console.log("🌱 Seeding database...");

  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 12);

  await prisma.activity.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({
    data: {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice@example.com",
      passwordHash,
    },
  });

  const bob = await prisma.user.create({
    data: {
      firstName: "Bob",
      lastName: "Smith",
      email: "bob@example.com",
      passwordHash,
    },
  });

  const carol = await prisma.user.create({
    data: {
      firstName: "Carol",
      lastName: "Williams",
      email: "carol@example.com",
      passwordHash,
    },
  });

  const dave = await prisma.user.create({
    data: {
      firstName: "Dave",
      lastName: "Brown",
      email: "dave@example.com",
      passwordHash,
    },
  });

  const activities = [
    { userId: alice.id, sport: "RUNNING" as const, unit: "KM" as const, value: 5.2, points: 52 },
    { userId: alice.id, sport: "CYCLING" as const, unit: "KM" as const, value: 15.0, points: 75 },
    { userId: alice.id, sport: "DAILY_STEPS" as const, unit: "STEPS" as const, value: 10500, points: 30 },
    { userId: bob.id, sport: "SWIMMING" as const, unit: "MINUTES" as const, value: 45, points: 90 },
    { userId: bob.id, sport: "GYM" as const, unit: "MINUTES" as const, value: 60, points: 60 },
    { userId: bob.id, sport: "RUNNING" as const, unit: "KM" as const, value: 8.0, points: 80 },
    { userId: carol.id, sport: "WALKING" as const, unit: "KM" as const, value: 3.5, points: 18 },
    { userId: carol.id, sport: "CYCLING" as const, unit: "KM" as const, value: 25.0, points: 125 },
    { userId: carol.id, sport: "DAILY_STEPS" as const, unit: "STEPS" as const, value: 12300, points: 40 },
    { userId: carol.id, sport: "SWIMMING" as const, unit: "MINUTES" as const, value: 30, points: 60 },
    { userId: dave.id, sport: "GYM" as const, unit: "MINUTES" as const, value: 90, points: 90 },
    { userId: dave.id, sport: "RUNNING" as const, unit: "KM" as const, value: 10.0, points: 100 },
  ];

  for (const activity of activities) {
    await prisma.activity.create({ data: activity });
  }

  console.log(`✅ Seeded ${4} users and ${activities.length} activities.`);
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
