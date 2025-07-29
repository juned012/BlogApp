import express from "express";
import { getComments, postComment } from "../controllers/CommentController.js";
import { verifyAuthUser } from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.post("/:id/post-comment", verifyAuthUser, postComment);
router.get("/:id/comments", getComments);

export default router;
