const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Category = require('../models/Category');



// Get random post from a random category for hero section
router.get("/hero-post", async (req, res) => {
  try {
    // console.log('📥 Fetching hero post...');
    
    // Get all published posts with populated category
    const posts = await Post.find({ isPublished: true })
      .populate('category', 'name slug');
    
    if (posts.length === 0) {
      // console.log('❌ No posts found');
      return res.status(404).json({ message: "No posts found" });
    }

    // Randomly select one post
    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    
    // console.log('✅ Sending hero post:', randomPost.title);
    res.status(200).json(randomPost);
  } catch (error) {
    console.error("FETCH HERO POST ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get all categories
router.get("/categories", async (req, res) => {
  try {
    // console.log('📥 Fetching categories...');
    const categories = await Category.find().sort({ name: 1 });
    // console.log(`✅ Found ${categories.length} categories`);
    res.status(200).json(categories);
  } catch (error) {
    console.error("FETCH CATEGORIES ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get latest posts
router.get("/latest", async (req, res) => {
  try {
    // console.log('📥 Fetching latest posts...');
    const posts = await Post.find({ isPublished: true })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(3);
    
    // console.log(`✅ Found ${posts.length} latest posts`);
    res.status(200).json(posts);
  } catch (error) {
    console.error("FETCH LATEST POSTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get posts by category slug (limited to 3)
router.get("/by-category/:slug", async (req, res) => {
  try {
    // console.log('📥 Fetching posts for category:', req.params.slug);
    const category = await Category.findOne({ slug: req.params.slug });
    
    if (!category) {
      // console.log('❌ Category not found:', req.params.slug);
      return res.status(404).json({ message: "Category not found" });
    }

    const posts = await Post.find({ 
      category: category._id,
      isPublished: true 
    })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(3);

    // console.log(`✅ Found ${posts.length} posts in category`);
    res.status(200).json(posts);
  } catch (error) {
    console.error("FETCH POSTS BY CATEGORY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get all posts by category slug (for "See All" button)
router.get("/all-by-category/:slug", async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    
    // console.log(`📥 Fetching all posts for category: ${req.params.slug}, page: ${page}`);
    const category = await Category.findOne({ slug: req.params.slug });
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const posts = await Post.find({ 
      category: category._id,
      isPublished: true 
    })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Post.countDocuments({ 
      category: category._id,
      isPublished: true 
    });

    // console.log(`✅ Found ${posts.length} posts, total: ${count}`);
    res.status(200).json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalPosts: count
    });
  } catch (error) {
    console.error("FETCH ALL POSTS BY CATEGORY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get single post by slug (MUST BE LAST to avoid conflicts)
router.get("/:slug", async (req, res) => {
  try {
    // console.log('📥 Fetching post by slug:', req.params.slug);
    const post = await Post.findOne({ 
      slug: req.params.slug,
      isPublished: true 
    })
      .populate('category', 'name slug');
    
    if (!post) {
      // console.log('❌ Post not found:', req.params.slug);
      return res.status(404).json({ message: "Post not found" });
    }

    // console.log('✅ Found post:', post.title);
    res.status(200).json(post);
  } catch (error) {
    console.error("FETCH POST ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("category");

    if (!post) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;