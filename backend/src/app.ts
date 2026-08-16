import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { openapiSpec } from "./docs/swagger";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/api-docs.json", (_req, res) => {
  res.json(openapiSpec);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use("/api/auth", authRoutes);

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "FitQuest API is running",
  });
});

export default app;
