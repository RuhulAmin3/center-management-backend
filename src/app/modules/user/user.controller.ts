import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { userService } from "./user.services";

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const createdStudent = await userService.createStudent(student, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "student create successful",
    data: createdStudent,
  });
});

const createTeacher = catchAsync(async (req: Request, res: Response) => {
  const { teacher, ...userData } = req.body;
  const createdTeacher = await userService.createTeacher(teacher, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Teacher create successful",
    data: createdTeacher,
  });
});

export const userController = {
  createStudent,
  createTeacher,
};
