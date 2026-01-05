const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const quizRoutes = require("./routes/quizRoutes");
const interviewRoutes = require("./routes/interviewRoutes"); // UNCOMMENTED
const badgeRoutes = require("./routes/badgeRoutes");
const errorHandler = require("./middleware/errorHandler");
const { createDefaultBadges } = require("./utils/badgeUtils");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: [
          "'self'",
          "data:",
          "https://res.cloudinary.com",
          "https://cdn-icons-png.flaticon.com",
          "https://api.dicebear.com",
          "https://ui-avatars.com",
        ],
        connectSrc: [
          "'self'",
          "https://*.googleapis.com",
          "https://generativelanguage.googleapis.com",
          "http://localhost:8000", // Allow connection to Python ML Service
        ],
      },
    },
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(passport.initialize());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(async () => {
    console.log("MongoDB connected");
    // Initialize badges if needed
    if (createDefaultBadges) await createDefaultBadges();
  })
  .catch((err) => {
    console.error("Database Connection Error:", err.message);
    process.exit(1);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB Runtime Error:", err);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/badges", badgeRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/docs", (req, res) => {
  res.json({
    version: "1.0.0",
    message: "Gamified Learning API",
  });
});

// 404 Handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

module.exports = app;
