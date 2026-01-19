const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

router.post("/createpost", async (req, res) => {
  try {
    const { categoryId, mediaUrl, mediaType, title, paragraph, postedBy } = req.body;

    if (!categoryId || !mediaUrl || !title || !paragraph || !postedBy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const post = await Post.create({
      category: categoryId,
       mediaUrl,
      mediaType,
      title,
      paragraph,
      postedBy,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("CREATE POST ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/fetchbycategory/:categoryId", async (req, res) => {
  try {
    const posts = await Post.find({category: req.params.categoryId,}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("FETCH POSTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

router.put("/updatepost/:id", async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/deletepost/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("DELETE POST ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
