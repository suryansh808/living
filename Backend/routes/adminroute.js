const express = require("express");
const router = express.Router();
require("dotenv").config();
const adminMail = require("../models/admin");
const jwt = require("jsonwebtoken");
const Category = require("../models/Category");
const Post = require("../models/Post");

router.post("/checkauthgmail", async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await adminMail.findOne({ email });

    if (!admin) {
      return res.status(401).json({ error: "Admin not found" });
    }
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/adminverifyToken", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "Token is valid" });
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const totalCategories = await Category.countDocuments();
    const totalPosts = await Post.countDocuments();

    // Posts created today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const publishedToday = await Post.countDocuments({
      createdAt: { $gte: startOfDay },
    });

    res.status(200).json({
      totalCategories,
      totalPosts,
      publishedToday,
    });
  } catch (error) {
    console.error("ADMIN STATS ERROR:", error);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
});

module.exports = router;