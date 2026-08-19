import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../src/app";
import { prisma } from "../src/lib/prisma";

describe("FitQuest API Integration Tests", () => {
  const testEmail = `testuser_${Date.now()}@example.com`;
  const testPassword = "Password123!";
  let authCookie: string;
  let createdActivityId: string;

  afterAll(async () => {
    // Clean up created test user and associated activities
    const user = await prisma.user.findUnique({
      where: { email: testEmail },
    });
    if (user) {
      await prisma.activity.deleteMany({ where: { userId: user.id } });
      await prisma.user.delete({ where: { id: user.id } });
    }
  });

  describe("GET /api/health", () => {
    it("should return 200 and healthy status", async () => {
      const res = await request(app).get("/api/health");
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("FitQuest API is running");
    });
  });

  describe("Authentication Endpoints", () => {
    it("POST /api/auth/register - should register a new user and return auth cookie", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          firstName: "Test",
          lastName: `Runner_${Date.now()}`,
          email: testEmail,
          password: testPassword,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toBeDefined();
      expect(res.body.data.user.email).toBe(testEmail);

      const cookies = res.headers["set-cookie"];
      expect(cookies).toBeDefined();
      authCookie = Array.isArray(cookies) ? cookies[0] : cookies;
    });

    it("POST /api/auth/login - should authenticate with valid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: testEmail,
          password: testPassword,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe(testEmail.toLowerCase());
    });

    it("POST /api/auth/login - should authenticate case-insensitively with uppercase email", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: testEmail.toUpperCase(),
          password: testPassword,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe(testEmail.toLowerCase());
    });

    it("POST /api/auth/login - should reject invalid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: testEmail,
          password: "WrongPassword!",
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it("GET /api/auth/me - should get user profile when authenticated", async () => {
      const res = await request(app)
        .get("/api/auth/me")
        .set("Cookie", authCookie);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe(testEmail);
    });

    it("GET /api/auth/me - should reject unauthenticated request", async () => {
      const res = await request(app).get("/api/auth/me");
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe("Activity Endpoints", () => {
    it("POST /api/activities - should create a new running activity with points", async () => {
      const res = await request(app)
        .post("/api/activities")
        .set("Cookie", authCookie)
        .send({
          sport: "RUNNING",
          distanceKm: 5.0,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.activity.sport).toBe("RUNNING");
      expect(res.body.data.activity.value).toBe(5.0);
      expect(res.body.data.activity.points).toBe(500);

      createdActivityId = res.body.data.activity.id;
    });

    it("POST /api/activities - should reject invalid sport metrics", async () => {
      const res = await request(app)
        .post("/api/activities")
        .set("Cookie", authCookie)
        .send({
          sport: "RUNNING",
          durationSeconds: 1800, // Invalid for RUNNING
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("GET /api/activities - should list user activities", async () => {
      const res = await request(app)
        .get("/api/activities")
        .set("Cookie", authCookie);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.activities)).toBe(true);
      expect(res.body.data.activities.length).toBeGreaterThan(0);
    });

    it("DELETE /api/activities/:id - should delete an existing activity", async () => {
      const res = await request(app)
        .delete(`/api/activities/${createdActivityId}`)
        .set("Cookie", authCookie);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.message).toBe("Activity deleted successfully");
    });
  });

  describe("Leaderboard Endpoint", () => {
    it("GET /api/leaderboard - should fetch leaderboard rankings", async () => {
      const res = await request(app)
        .get("/api/leaderboard?timeframe=all_time")
        .set("Cookie", authCookie);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.leaderboard)).toBe(true);
      expect(res.body.data.timeframe).toBe("all_time");
    });
  });
});
