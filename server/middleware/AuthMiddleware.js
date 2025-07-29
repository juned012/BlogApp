import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

export const verifyAuthUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id).select("-password");
    req.user = user;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid token", error: error.message });
  }
};
