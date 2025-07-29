import express from "express";
import {
  handlePostBlog,
  handleGetUserPosts,
  handleDeleteUserPost,
  handleGetAllPosts,
  handleViewBlog,
} from "../controllers/BlogPostController.js";
import { verifyAuthUser } from "./../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/post-blog", verifyAuthUser, handlePostBlog);
router.get("/get-blog", verifyAuthUser, handleGetUserPosts);
router.get("/all-blog", handleGetAllPosts);
router.delete("/delete-blog/:id", verifyAuthUser, handleDeleteUserPost);
router.get("/all-blog/:id", handleViewBlog);

export default router;
