import CommentModel from "../models/CommentModel.js";

export const postComment = async (req, res) => {
  const { content } = req.body;
  try {
    const userId = req.user._id;
    const postId = req.params.id;

    if (!content || !postId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newComment = new CommentModel({
      content,
      author: userId,
      post: postId,
    });

    await newComment.save();

    return res
      .status(200)
      .json({ message: "Comment posted successfully", comment: newComment });
  } catch (error) {
    return res.status(400).json({
      message: "Error while commenting on post",
      error: error.message,
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await CommentModel.find({ post: postId })
      .populate("author", "fullName")

      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error while getting comments",
      error: error.message,
    });
  }
};
