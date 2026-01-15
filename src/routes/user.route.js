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
  getUserChannelProfile,
  getWatchHistory,
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

router.route("/current-user").get(verfifyJWT, getCurrentUser);

router.route("/update-account").patch(verfifyJWT, updateAccountDetails);

router
  .route("/update-avatar")
  .patch(verfifyJWT, upload.single("avatar"), updateUserAvatar);

router
  .route("/update-cover-image")
  .patch(verfifyJWT, upload.single("coverImage"), updateUserCoverImage);
router.route;

router.route("/c/:username").get(verfifyJWT, getUserChannelProfile);
router.route("/history").get(verfifyJWT, getWatchHistory);
export default router;
