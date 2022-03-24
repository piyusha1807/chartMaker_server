import express from "express";
import {
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/profile").post(protect, updateUserProfile);

export default router;
