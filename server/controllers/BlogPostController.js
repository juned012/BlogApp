import BlogModel from "../models/BlogModel.js";
export const handlePostBlog = async (req, res) => {
  const {
    title,
    category,
    image,
    summary,
    tags,
    readTime,
    description,
    status,
  } = req.body;

  try {
    const newPost = new BlogModel({
      title,
      author: req.user._id,
      category,
      image,
      summary,
      tags,
      readTime,
      description,
      status,
    });

    await newPost.save();

    return res
      .status(200)
      .json({ message: "Post created Successfully!", blogPost: newPost });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error while posting blog", error: error.message });
  }
};

export const handleGetUserPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const userPosts = await BlogModel.find({ author: userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ posts: userPosts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching user's posts", error: error.message });
  }
};

export const handleGetAllPosts = async (req, res) => {
  try {
    const allPosts = await BlogModel.find({ status: "published" })
      .populate("author", "fullName")
      .sort({ createdAt: -1 });
    return res.status(200).json({ posts: allPosts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

export const handleDeleteUserPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;

    const post = await BlogModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }
    await BlogModel.findByIdAndDelete(postId);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
};

export const handleViewBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findById(id).populate("author");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ blog });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching blog post", error: error.message });
  }
};
