import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { openapiSpec } from "./docs/swagger";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// Security headers — must be first
app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173",
    credentials: true,
  }),
);

// Explicit body size limit prevents large-payload attacks
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

// Routes
app.use("/api/auth", authRoutes);

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "FitQuest API is running",
  });
});

// Global error handler — must be the last middleware registered
app.use(errorHandler);

export default app;
