import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      required: true,
      maxlength: 300,
    },
    tags: {
      type: [String],
      default: [],
    },
    readTime: {
      type: String,
      default: "2 min read",
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("Post", blogSchema);

export default BlogModel;
