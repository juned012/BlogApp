import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import handleDbConnection from "./config/db.js";
import UserRoutes from "./routes/UserRoute.js";
import BlogPostRoute from "./routes/BlogPostRoute.js";
import CommentRoute from "./routes/CommentRoute.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URI,
  })
);

app.use(express.json());

// ✅ Get __dirname (for ES Module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

handleDbConnection();

const PORT = process.env.PORT || 5000;

app.use("/api/user", UserRoutes);
app.use("/api/blog", BlogPostRoute);
app.use("/api/comment", CommentRoute);

app.listen(PORT, () => {
  console.log("Server is running");
});
