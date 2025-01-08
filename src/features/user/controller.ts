import { Response, NextFunction } from "express";

import { Req } from "../../types";
import { User } from "./model";
import response from "../../utilities/response";
import { deleteFile, fileUploader } from "../../middleware/file-handler";

export const getUserById = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) return response(res, 404, "User does not exist");
    return response(res, 200, "User details", user);
  } catch (error) {
    next(error);
  }
};

export const fetchUser = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) return response(res, 404, "User does not exist");
    return response(res, 200, "User details", user);
  } catch (error) {
    next(error);
  }
};

export const fetchAllUsers = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  const { type } = req.query;
  const userId = req.user?._id;
  try {
    if (
      typeof type === "string" &&
      !["admin", "user", "manager"].includes(type)
    ) {
      return response(res, 400, "Invalid user type");
    }
    const query: { createdBy: typeof userId; type?: string } = {
      createdBy: userId,
    };
    if (typeof type === "string") query.type = type;
    const user = await User.find(query);
    return response(res, 200, "User details", user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, body } = req;
    const updatedUser = await User.findOneAndUpdate(
      { _id: user?._id },
      { ...body },
      {
        new: true,
      }
    );
    if (!updatedUser) return response(res, 404, "User does not exist");
    return response(res, 200, "Profile updated");
  } catch (error) {
    next(error);
  }
};

export const uploadProfilePicture = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  try {
    const { file } = req;
    if (!file) return response(res, 404, "Image was not uploaded");
    if (!file.mimetype.includes("image"))
      return response(res, 400, "You are expected to upload an image");
    const user = await User.findById(req?.user?._id);
    if (!user) return response(res, 404, "User does not exist");
    if (user?.avatar?.publicId) await deleteFile(user.avatar.publicId, "image");
    const { status, data, message } = await fileUploader(file.path);
    if (!status) return response(res, 400, message);
    user.avatar = { publicId: data.public_id, url: data.url };
    await user.save();
    return response(res, 200, "Profile picture uploaded");
  } catch (error) {
    next(error);
  }
};

export const deactivateAccount = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user?._id },
      { deactivated: true },
      {
        new: true,
      }
    );
    if (!user) return response(res, 404, "User does not exist");
    return response(
      res,
      200,
      "Your account has been deactivated, kindly contact the customer care to reactivate your account"
    );
  } catch (error) {
    next(error);
  }
};
