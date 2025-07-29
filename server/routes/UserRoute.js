import express from "express";
import { registerUser, loginUser } from "../controllers/UserController.js";
import { upload } from "../middleware/upload.js";
const router = express.Router();

router.post("/signup", upload.single("avatar"), registerUser);
router.post("/login", loginUser);

export default router;
