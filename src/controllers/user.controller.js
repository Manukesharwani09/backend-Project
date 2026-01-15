import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(
  async (req, res) => {
    // Registration logic here

    const { fullName, email, password, username } = req.body;

    if (
      [fullName, email, password, username].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existedUser) {
      throw new ApiError(
        409,
        "User with given email or username already exists"
      );
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar image is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath, "avatars");
    let coverImage;
    if (coverImageLocalPath) {
      coverImage = await uploadOnCloudinary(coverImageLocalPath, "coverImages");
    }

    if (!avatar) {
      throw new ApiError(400, "Avatar field required");
    }
    const user = await User.create({
      fullName,
      email,
      password,
      username: username.toLowerCase(),
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      throw new ApiError(500, "User creation failed");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, true, "User registered successfully", createdUser)
      );
  }

  // Continue with user creation logic here
);

export { registerUser };
