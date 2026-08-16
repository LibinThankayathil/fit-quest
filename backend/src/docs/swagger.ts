import swaggerJsdoc from "swagger-jsdoc";

export const openapiSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "FitQuest API",
      version: "1.0.0",
      description:
        "REST API for FitQuest. Authentication uses an HttpOnly accessToken cookie.",
    },
    servers: [{ url: "http://localhost:3000", description: "Local server" }],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
          description:
            "Set automatically after a successful register or login response.",
        },
      },
      schemas: {
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
            password: { type: "string", format: "password", example: "SecurePass123!" },
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
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        ValidationError: {
          type: "object",
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
            message: { type: "string", example: "Invalid email or password" },
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
          responses: {
            "200": { description: "API is running" },
          },
        },
      },
      "/api/auth/register": {
        post: {
          tags: ["Authentication"],
          summary: "Register a user and set the authentication cookie",
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
              description: "User registered; the HttpOnly accessToken cookie is set.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "object",
                        properties: {
                          userId: { type: "string" },
                          user: { $ref: "#/components/schemas/User" },
                        },
                      },
                    },
                  },
                },
              },
            },
            "400": { description: "Validation failed", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
            "409": { description: "Email or full name is already registered", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          },
        },
      },
      "/api/auth/login": {
        post: {
          tags: ["Authentication"],
          summary: "Log in and set the authentication cookie",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginRequest" },
              },
            },
          },
          responses: {
            "200": { description: "Logged in; the HttpOnly accessToken cookie is set." },
            "400": { description: "Validation failed", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
            "401": { description: "Invalid email or password", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          },
        },
      },
      "/api/auth/me": {
        get: {
          tags: ["Authentication"],
          summary: "Get the authenticated user",
          security: [{ cookieAuth: [] }],
          responses: {
            "200": { description: "Authenticated user" },
            "401": { description: "Authentication cookie is missing, invalid, or expired", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          },
        },
      },
    },
  },
  apis: [],
});
