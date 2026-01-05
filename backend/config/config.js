// config.js - Application configuration
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  // Server configuration
  server: {
    port: process.env.PORT || 5000,
    environment: process.env.NODE_ENV || "development",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173", // Changed to 5173
  },

  // Database configuration
  database: {
    uri:
      process.env.MONGODB_URI || "mongodb://localhost:27017/gamified_learning",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    },
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || "your_super_secret_jwt_key_change_this",
    expire: process.env.JWT_EXPIRE || "7d",
  },

  // Google OAuth configuration
  googleAuth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl:
      process.env.GOOGLE_CALLBACK_URL ||
      "http://localhost:5000/api/auth/google/callback",
  },

  // Cloudinary configuration
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  // Gemini API configuration
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
  },

  // CORS configuration
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },

  // File upload configuration
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFormats: ["jpg", "jpeg", "png", "gif"],
  },

  // Points system configuration
  points: {
    baseAccuracyMultiplier: 2,
    timeBonus: {
      fast: 50, // < 30 seconds per question
      medium: 25, // < 60 seconds per question
    },
    levels: [
      0, // Level 1
      1000, // Level 2
      2500, // Level 3
      5000, // Level 4
      10000, // Level 5
      20000, // Level 6
      35000, // Level 7
      50000, // Level 8
      75000, // Level 9
      100000, // Level 10
      150000, // Level 11
      200000, // Level 12
      300000, // Level 13
      500000, // Level 14
      750000, // Level 15
    ],
  },

  // Quiz configuration
  quiz: {
    defaultTimeLimit: 600, // 10 minutes in seconds
    passingScore: 70,
    minQuestionsPerQuiz: 5,
    maxQuestionsPerQuiz: 20,
  },

  // Interview configuration
  interview: {
    defaultTimeLimit: 3600, // 60 minutes in seconds
    questionsPerInterview: {
      beginner: 5,
      intermediate: 8,
      advanced: 10,
    },
  },
};
