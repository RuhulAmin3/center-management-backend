import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { userService } from "./user.services";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const retult = await userService.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "all user retrieved successfully",
    data: retult,
  });
});
const getUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const retult = await userService.getUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "user retrieved successfully by id",
    data: retult,
  });
});
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

const createGuardian = catchAsync(async (req: Request, res: Response) => {
  const { guardian, ...userData } = req.body;
  const createdGuardian = await userService.createGuardian(guardian, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Guardian account create successful waiting for admin approval",
    data: createdGuardian,
  });
});

export const userController = {
  createStudent,
  createTeacher,
  createGuardian,
  getAllUsers,
  getUser,
};
