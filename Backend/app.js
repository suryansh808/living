const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const AdminLogin = require("./routes/adminroute");
const categoryRoutes = require("./routes/category.routes.js");
const postRoutes = require("./routes/post.routes");
const blogRoutes = require("./routes/blog.routes");

dotenv.config();

const app = express();
const ALLOWED_ORIGIN = process.env.FRONTEND_URL;

/* ---------- DATABASE ---------- */
connectDB();

/* ---------- MIDDLEWARE ---------- */
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === ALLOWED_ORIGIN) {
        return callback(null, true);
      }
      console.warn(`CORS Blocked: ${origin}`);
      return callback(new Error("CORS policy: This origin is not allowed"), false);
    },
    credentials: true,
  })
);

app.use(express.json());

/* ---------- ROUTES ---------- */
app.use("/", AdminLogin);

app.use("/categories", categoryRoutes);

app.use("/posts", postRoutes);

app.use("/", blogRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to backend server");
});

/* ---------- ERROR HANDLER ---------- */
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: err.message });
});

module.exports = app;
