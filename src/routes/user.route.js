import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controller.js";
import { verfifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verfifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/change-password").post(verfifyJWT, changeCurrentPassword);

router.route("/me").get(verfifyJWT, getCurrentUser);

router.route("/update-account").put(verfifyJWT, updateAccountDetails);

router
  .route("/update-avatar")
  .put(verfifyJWT, upload.single("avatar"), updateUserAvatar);

router
  .route("/update-cover-image")
  .put(verfifyJWT, upload.single("coverImage"), updateUserCoverImage);

export default router;
