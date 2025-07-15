const dotenv = require("dotenv");
const cron = require("node-cron");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");
const connectDB = require("./config/dbConnection");
const resumeRouter = require("./router/resumeRouter");
const AdminRouter = require("./router/AdminRouter");
const DreamRouter = require("./router/DreamRouter");
const RecruiterRouter = require("./router/RecuriterRouter");
const RecruiterProfileRoute = require("./router/RecuriterProfileRoute");
const {
  calculateAndStoreDailyActiveUsers,
} = require("./controller/AdminController");

const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";

dotenv.config({ path: path.resolve(__dirname, envFile) });

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://sharpai.sharpenedmindtechnologies.com/",
  "http://localhost:5173/",
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());
app.use(logger("dev"));

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "application/json"],
    credentials: true,
  })
);

// Apply Clerk Middleware for All Routes
// app.use(clerkAuthMiddleware);

// Example of a Protected Route
// app.get('/protected', requireAuth, (req, res) => {
//     const { auth } = req;
//     res.json({ message: 'Access granted!', userId: auth.userId });
// });

cron.schedule("0 0 * * *", () => {
  console.log("⏳ Running daily active user calculation...");
  calculateAndStoreDailyActiveUsers();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/api/resume", resumeRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/dreams", DreamRouter);
app.use("/api/recruiter", RecruiterRouter);
app.use("/api/recuriter/profile", RecruiterProfileRoute);

// Sample API for Redis Caching
app.get("/redis_cache", async (req, res) => {
  const cacheKey = "my_cached_data";
  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res
        .status(200)
        .json({ fromCache: true, data: JSON.parse(cachedData) });
    }

    const freshData = { message: "Hello from Redis!", timestamp: new Date() };

    await redisClient.setEx(cacheKey, 60, JSON.stringify(freshData));

    return res.status(200).json({ fromCache: false, data: freshData });
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ status: false, message: "Redis Error" });
  }
});

//Redis Checker API
app.get("/redis-check", async (req, res) => {
  try {
    const ping = await redisClient.ping();
    res
      .status(200)
      .json({ status: true, message: "Redis Connected Successfully", ping });
  } catch (error) {
    console.error("Redis Connection Error:", error);
    res
      .status(500)
      .json({
        status: false,
        message: "Redis Connection Failed",
        error: error.message,
      });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ status: false, message: "Internal Server Error" });
});

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Handle preflight requests
  }

  next();
});

// Bootstrap
(async () => {
  await connectDB(); // <-- Explicit DB connection
  app.listen(PORT, () => {
    console.log(
      `🚀 Server running in ${process.env.NODE_ENV || "development"} mode`
    );
    console.log(`📡 Listening on http://localhost:${PORT}`);
  });
})();
