import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { CONFIG, validateEnvironment } from "./config/config.js";
import { logger } from "./config/logger.js";

import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";

/* ================================
   ENV VALIDATION
================================ */
try {
  validateEnvironment();
} catch (error) {
  logger.error("Environment validation failed", error);
  process.exit(1);
}

const app = express();

/* ================================
   CORS (FIXED)
   - Allows localhost + deployed domains
   - Prevents verify-payment blockage
================================ */
app.use(
  cors({
    origin: true,          // ✅ allow all origins in dev
    credentials: true,
  })
);

/* ================================
   BODY PARSER
================================ */
app.use(express.json({ limit: CONFIG.MAX_REQUEST_SIZE }));

/* ================================
   RATE LIMITERS
================================ */

// General limiter (safe for all APIs)
const generalLimiter = rateLimit({
  windowMs: CONFIG.RATE_LIMIT_WINDOW_MS,
  max: CONFIG.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
});

// Payment limiter
// ❗ IMPORTANT: DO NOT block OPTIONS or verify-payment
const paymentLimiter = rateLimit({
  windowMs: CONFIG.RATE_LIMIT_WINDOW_MS,
  max: CONFIG.PAYMENT_RATE_LIMIT_MAX,
  skip: (req) =>
    req.method === "OPTIONS" ||
    req.path.includes("verify-payment"),
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(generalLimiter);

/* ================================
   HEALTH CHECK
================================ */
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: CONFIG.NODE_ENV,
  });
});

/* ================================
   ROUTES (FIXED ORDER)
================================ */

// Rate-limit ONLY order creation
app.post("/api/payment/create-order", paymentLimiter);

// Never rate-limit verification
app.use("/api/payment", paymentRoutes);

app.use("/api/order", orderRoutes);
app.use("/api/tracking", trackingRoutes);

/* ================================
   404 HANDLER
================================ */
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.path,
  });
});

/* ================================
   GLOBAL ERROR HANDLER
================================ */
app.use((err, req, res, next) => {
  logger.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
    message:
      CONFIG.NODE_ENV === "development" ? err.message : undefined,
  });
});

/* ================================
   START SERVER
================================ */
const server = app.listen(CONFIG.PORT, () => {
  logger.success(`Server running on port ${CONFIG.PORT}`);
  logger.info(`Environment: ${CONFIG.NODE_ENV}`);
  logger.info(`Test Mode: ${CONFIG.TEST_MODE ? "Enabled" : "Disabled"}`);
});

/* ================================
   GRACEFUL SHUTDOWN
================================ */
const gracefulShutdown = (signal) => {
  logger.info(`${signal} received. Closing server...`);
  server.close(() => {
    logger.success("Server closed successfully");
    process.exit(0);
  });

  setTimeout(() => {
    logger.error("Forced shutdown");
    process.exit(1);
  }, 10000);
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
