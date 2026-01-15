import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const verfifyJWT = asyncHandler(async (req, _, next) => {
  console.log("token");
  console.log(process.env.ACCESS_TOKEN_SECRET);

  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized access, token missing");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Unauthorized access, user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized access, invalid token");
  }
});
