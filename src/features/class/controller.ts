import { NextFunction, Request, Response } from "express";
import { Req } from "../../types";
import { Class } from "./model";
import response from "../../utilities/response";

export const getClass = async (req: Req, res: Response, next: NextFunction) => {
  const user = req.user?._id;
  const query = { createdBy: user };
  try {
    const allClasses = await Class.find(query);
    return response(res, 200, "Classes fetched successfully", allClasses);
  } catch (error) {
    next(error);
  }
};

export const getClassById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const foundClass = await Class.findById(id);
    if (!foundClass) return response(res, 404, "Class does not exist");
    return response(res, 200, "Class fetched successfully", foundClass);
  } catch (error) {
    next(error);
  }
};

export const createClass = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  const user = req.user?._id;
  try {
    const newClass = await Class.create({ ...req.body, createdBy: user });
    return response(res, 201, "Class created successfully", newClass);
  } catch (error) {
    next(error);
  }
};
export const updateClass = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const updatedClass = await Class.findOneAndUpdate(
      { _id: id },
      { ...body },
      {
        new: true,
      }
    );
    if (!updatedClass) return response(res, 404, "Class does not exist");
    return response(res, 200, "Class updated", updatedClass);
  } catch (error) {
    next(error);
  }
};
export const deleteClass = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {};
