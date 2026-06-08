require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const seedAdmin = require("./utils/seedAdmin");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const tutorRoutes = require("./routes/tutor.routes");
const courseRoutes = require("./routes/course.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const batchRoutes = require("./routes/batch.routes");
const announcementRoutes = require("./routes/announcement.routes");
const applicationRoutes = require("./routes/application.routes");
const { errorHandler, notFound } = require("./middleware/error.middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://yusratuitionlab-elu5.vercel.app",
  
];
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://yusratuitionlab-elu5.vercel.app",
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // safe fallback for deployment
      }
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("YusratuitionLab API is running 🚀");
});

app.get("/api/health", (req, res) => res.json({ success: true, message: "API is healthy." }));
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tutor", tutorRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/applications", applicationRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();
  await seedAdmin();
  app.listen(PORT,"0.0.0.0", () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
};

startServer();
