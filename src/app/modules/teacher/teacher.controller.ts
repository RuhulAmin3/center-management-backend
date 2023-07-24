import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { teacherService } from "./teacher.services";
import { pick } from "../../../shared/pick";
import { teacherFilterAbleField } from "./teacher.constant";
import { paginationFields } from "../../../constant/paginationOptions";

const getAllTeacher = catchAsync(async (req: Request, res: Response) => {
  const searchFields = pick(req.query, teacherFilterAbleField);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await teacherService.getAllTeacher(
    searchFields,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "all teachers retrieved successful",
    data: result?.data,
    meta: result?.meta,
  });
});

const getSingleTeacher = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await teacherService.getSingleTeacher(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "single teacher retrieved successful",
    data: result,
  });
});
const updateTeacher = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data } = req.body;
  const result = await teacherService.updateTeacher(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "teacher update successful",
    data: result,
  });
});

const deleteTeacher = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await teacherService.deleteTeacher(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "teacher delete successful",
    data: result,
  });
});

export const teacherController = {
  getAllTeacher,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
};
