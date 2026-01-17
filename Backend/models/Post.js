const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    // imageUrl: {
    //   type: String,
    //   required: true,
    // },
    mediaUrl: String,
mediaType: {
  type: String,
  enum: ["image", "video"],
  default: "image",
},

    title: {
      type: String,
      required: true,
      trim: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
    },
    postedBy: {
      type: String,
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Post", postSchema);