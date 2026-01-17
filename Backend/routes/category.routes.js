const express = require("express");
const Category = require("../models/Category");
const router = express.Router();

router.post("/createcategory", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    // prevent duplicates
    const exists = await Category.findOne({ slug });
    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name, slug });

    res.status(201).json(category);
  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/fetchcategory", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    console.error("FETCH CATEGORY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

router.put("/editcategory/:id", async (req, res) => {
  try {
   const { name } = req.body;
   
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    console.error("EDIT CATEGORY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/deletecategory/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("DELETE CATEGORY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
