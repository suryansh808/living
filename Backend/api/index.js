const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../config/db.js");
const AdminLogin = require("../routes/adminroute");
const categoryRoutes = require("../routes/category.routes.js");
const postRoutes = require("../routes/post.routes");
const blogRoutes = require("../routes/blog.routes");

dotenv.config();

const app = express();


 connectDB();


app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT" , "DELETE" , "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use(express.json());


app.use("/", AdminLogin);

app.use("/categories", categoryRoutes);

app.use("/posts", postRoutes);

app.use("/", blogRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to backend server");
});


app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: err.message });
});

module.exports = app;
