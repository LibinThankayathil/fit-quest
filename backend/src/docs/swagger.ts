import swaggerJsdoc from "swagger-jsdoc";

export const openapiSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "FitQuest API",
      version: "1.0.0",
      description:
        "REST API for FitQuest - Gamified Fitness Tracker. Authentication uses an HttpOnly `accessToken` cookie.",
    },
    servers: [{ url: "http://localhost:3000", description: "Local Development Server" }],
    tags: [
      {
        name: "Authentication",
        description: "User registration, authentication sessions, and current user profile",
      },
      {
        name: "Activities",
        description: "Activity logging, user activity history, and activity management",
      },
      {
        name: "Leaderboard",
        description: "Global leaderboard rankings and aggregated statistics across timeframes",
      },
      {
        name: "Health",
        description: "API health and availability check",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
          description:
            "Set automatically after a successful register or login response via HttpOnly cookie.",
        },
      },
      schemas: {
        Sport: {
          type: "string",
          enum: ["RUNNING", "WALKING", "CYCLING", "SWIMMING", "GYM", "DAILY_STEPS"],
          example: "RUNNING",
          description: "Supported sport and activity types",
        },
        MetricUnit: {
          type: "string",
          enum: ["KM", "MINUTES", "STEPS"],
          example: "KM",
          description: "Unit of measurement for the activity",
        },
        LeaderboardTimeframe: {
          type: "string",
          enum: ["this_week", "this_month", "all_time"],
          default: "this_month",
          example: "this_month",
          description: "Timeframe filter for calculating leaderboard rankings",
        },
        RegisterRequest: {
          type: "object",
          required: ["firstName", "lastName", "email", "password"],
          properties: {
            firstName: { type: "string", minLength: 1, maxLength: 50, example: "Jane" },
            lastName: { type: "string", minLength: 1, maxLength: 50, example: "Doe" },
            email: { type: "string", format: "email", example: "jane@example.com" },
            password: {
              type: "string",
              format: "password",
              minLength: 8,
              maxLength: 128,
              example: "SecurePass123!",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "jane@example.com" },
            password: { type: "string", format: "password", minLength: 1, example: "SecurePass123!" },
          },
        },
        User: {
          type: "object",
          required: ["id", "firstName", "lastName", "email", "createdAt", "updatedAt"],
          properties: {
            id: { type: "string", example: "cm123abc" },
            firstName: { type: "string", example: "Jane" },
            lastName: { type: "string", example: "Doe" },
            email: { type: "string", format: "email", example: "jane@example.com" },
            createdAt: { type: "string", format: "date-time", example: "2026-08-18T10:00:00.000Z" },
            updatedAt: { type: "string", format: "date-time", example: "2026-08-18T10:00:00.000Z" },
          },
        },
        UserResponse: {
          type: "object",
          required: ["success", "data"],
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              required: ["user"],
              properties: {
                user: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
        CreateActivityRequest: {
          type: "object",
          required: ["sport"],
          properties: {
            sport: { $ref: "#/components/schemas/Sport" },
            distanceKm: {
              type: "number",
              minimum: 0.001,
              example: 5.2,
              description: "Required for RUNNING, WALKING, CYCLING (in kilometers). Not applicable for other sports.",
            },
            durationSeconds: {
              type: "number",
              minimum: 1,
              example: 2700,
              description: "Required for SWIMMING, GYM (in seconds). Not applicable for other sports.",
            },
            steps: {
              type: "integer",
              minimum: 1,
              example: 8500,
              description: "Required for DAILY_STEPS (positive integer). Not applicable for other sports.",
            },
            recordedAt: {
              type: "string",
              format: "date-time",
              example: "2026-08-18T08:30:00.000Z",
              description: "Optional ISO 8601 timestamp. Defaults to current server time if omitted.",
            },
          },
        },
        Activity: {
          type: "object",
          required: ["id", "sport", "unit", "value", "points", "recordedAt", "createdAt"],
          properties: {
            id: { type: "string", example: "cm7activity123" },
            sport: { $ref: "#/components/schemas/Sport" },
            unit: { $ref: "#/components/schemas/MetricUnit" },
            value: { type: "number", example: 5.2, description: "Recorded value in the corresponding unit" },
            points: { type: "integer", example: 104, description: "Calculated points earned for this activity" },
            recordedAt: { type: "string", format: "date-time", example: "2026-08-18T08:30:00.000Z" },
            createdAt: { type: "string", format: "date-time", example: "2026-08-18T08:30:00.000Z" },
          },
        },
        ActivityResponse: {
          type: "object",
          required: ["success", "data"],
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              required: ["activity"],
              properties: {
                activity: { $ref: "#/components/schemas/Activity" },
              },
            },
          },
        },
        ActivitiesListResponse: {
          type: "object",
          required: ["success", "data"],
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              required: ["activities"],
              properties: {
                activities: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Activity" },
                },
              },
            },
          },
        },
        RecentActivity: {
          type: "object",
          required: ["sport", "label", "recordedAt"],
          properties: {
            sport: { type: "string", example: "RUNNING" },
            label: { type: "string", example: "5k Run" },
            recordedAt: { type: "string", format: "date-time", example: "2026-08-18T08:30:00.000Z" },
          },
        },
        LeaderboardEntry: {
          type: "object",
          required: [
            "rank",
            "userId",
            "firstName",
            "lastName",
            "displayName",
            "points",
            "activitiesCount",
            "recentActivity",
            "isCurrentUser",
          ],
          properties: {
            rank: { type: "integer", example: 1 },
            userId: { type: "string", example: "cm123abc" },
            firstName: { type: "string", example: "Jane" },
            lastName: { type: "string", example: "Doe" },
            displayName: { type: "string", example: "Jane D." },
            points: { type: "integer", example: 450 },
            activitiesCount: { type: "integer", example: 12 },
            recentActivity: {
              anyOf: [
                { $ref: "#/components/schemas/RecentActivity" },
                { type: "null" },
              ],
            },
            isCurrentUser: { type: "boolean", example: true },
          },
        },
        LeaderboardData: {
          type: "object",
          required: ["timeframe", "leaderboard", "totalUsers", "currentUser"],
          properties: {
            timeframe: { $ref: "#/components/schemas/LeaderboardTimeframe" },
            leaderboard: {
              type: "array",
              items: { $ref: "#/components/schemas/LeaderboardEntry" },
            },
            totalUsers: { type: "integer", example: 25 },
            currentUser: {
              anyOf: [
                { $ref: "#/components/schemas/LeaderboardEntry" },
                { type: "null" },
              ],
            },
          },
        },
        LeaderboardResponse: {
          type: "object",
          required: ["success", "data"],
          properties: {
            success: { type: "boolean", example: true },
            data: { $ref: "#/components/schemas/LeaderboardData" },
          },
        },
        MessageResponse: {
          type: "object",
          required: ["success", "data"],
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              required: ["message"],
              properties: {
                message: { type: "string", example: "Logged out successfully" },
              },
            },
          },
        },
        HealthResponse: {
          type: "object",
          required: ["success", "message"],
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "FitQuest API is running" },
          },
        },
        ValidationError: {
          type: "object",
          required: ["field", "message"],
          properties: {
            field: { type: "string", example: "email" },
            message: { type: "string", example: "Invalid email address" },
          },
        },
        ErrorResponse: {
          type: "object",
          required: ["success", "message"],
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Validation failed" },
            errors: {
              type: "array",
              items: { $ref: "#/components/schemas/ValidationError" },
            },
          },
        },
      },
    },
    paths: {
      "/api/health": {
        get: {
          tags: ["Health"],
          summary: "Check API availability",
          description: "Returns API health status and confirms backend server is operational.",
          responses: {
            "200": {
              description: "API is running smoothly",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/HealthResponse" },
                },
              },
            },
          },
        },
      },
      "/api/auth/register": {
        post: {
          tags: ["Authentication"],
          summary: "Register a user and set authentication cookie",
          description:
            "Creates a new user account, signs a JWT access token, and sets the HttpOnly `accessToken` cookie.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegisterRequest" },
              },
            },
          },
          responses: {
            "201": {
              description: "User registered successfully; the HttpOnly accessToken cookie is set.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UserResponse" },
                },
              },
            },
            "400": {
              description: "Validation failed (e.g. invalid email format or password too short)",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "409": {
              description: "User with this email or full name is already registered",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/auth/login": {
        post: {
          tags: ["Authentication"],
          summary: "Log in and set authentication cookie",
          description:
            "Authenticates user credentials and sets the HttpOnly `accessToken` cookie upon success.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginRequest" },
              },
            },
          },
          responses: {
            "200": {
              description: "Logged in successfully; the HttpOnly accessToken cookie is set.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UserResponse" },
                },
              },
            },
            "400": {
              description: "Validation failed",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "401": {
              description: "Invalid email or password",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/auth/logout": {
        post: {
          tags: ["Authentication"],
          summary: "Log out user",
          description: "Clears the HttpOnly `accessToken` session cookie.",
          responses: {
            "200": {
              description: "Logged out successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/MessageResponse" },
                },
              },
            },
          },
        },
      },
      "/api/auth/me": {
        get: {
          tags: ["Authentication"],
          summary: "Get current authenticated user profile",
          description: "Returns the profile details of the user identified by the `accessToken` cookie.",
          security: [{ cookieAuth: [] }],
          responses: {
            "200": {
              description: "Authenticated user details",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UserResponse" },
                },
              },
            },
            "401": {
              description: "Authentication cookie is missing, invalid, or expired",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "404": {
              description: "User not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/activities": {
        post: {
          tags: ["Activities"],
          summary: "Log a new fitness activity",
          description:
            "Logs a workout or fitness activity for the authenticated user. Automatically scores points and stores the normalized metric unit.\n\n" +
            "**Metric Requirements by Sport:**\n" +
            "- `RUNNING`, `WALKING`, `CYCLING`: requires `distanceKm` (positive number)\n" +
            "- `SWIMMING`, `GYM`: requires `durationSeconds` (positive number)\n" +
            "- `DAILY_STEPS`: requires `steps` (positive integer)",
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateActivityRequest" },
              },
            },
          },
          responses: {
            "201": {
              description: "Activity recorded successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ActivityResponse" },
                },
              },
            },
            "400": {
              description: "Validation failed (invalid metric fields for the selected sport)",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "401": {
              description: "Authentication required",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        get: {
          tags: ["Activities"],
          summary: "Get authenticated user's activity history",
          description: "Retrieves all logged activities for the current authenticated user, ordered newest first by recorded timestamp.",
          security: [{ cookieAuth: [] }],
          responses: {
            "200": {
              description: "User activities list retrieved successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ActivitiesListResponse" },
                },
              },
            },
            "401": {
              description: "Authentication required",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/activities/{id}": {
        delete: {
          tags: ["Activities"],
          summary: "Delete an activity",
          description: "Deletes a specific activity owned by the authenticated user.",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
              description: "The unique activity ID",
              example: "cm7activity123",
            },
          ],
          responses: {
            "200": {
              description: "Activity deleted successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/MessageResponse" },
                },
              },
            },
            "400": {
              description: "Activity ID is required",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "401": {
              description: "Authentication required",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "403": {
              description: "Forbidden - You do not have permission to delete this activity",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "404": {
              description: "Activity not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/leaderboard": {
        get: {
          tags: ["Leaderboard"],
          summary: "Get global leaderboard rankings",
          description:
            "Retrieves users ranked by total activity points within the selected timeframe.\n\n" +
            "If the request includes a valid `accessToken` cookie, the response will identify the current user via `isCurrentUser: true` and populate the `currentUser` summary object.",
          security: [{ cookieAuth: [] }, {}],
          parameters: [
            {
              in: "query",
              name: "timeframe",
              required: false,
              schema: { $ref: "#/components/schemas/LeaderboardTimeframe" },
              description: "Timeframe filter for leaderboard points (default: `this_month`)",
            },
          ],
          responses: {
            "200": {
              description: "Leaderboard rankings and statistics",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LeaderboardResponse" },
                },
              },
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
});
