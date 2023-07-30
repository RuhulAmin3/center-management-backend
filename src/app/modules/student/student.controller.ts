import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { pick } from "../../../shared/pick";
import { paginationFields } from "../../../constant/paginationOptions";
import { studentFilterAbleField } from "./student.constant";
import { studentService } from "./student.services";

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const searchFields = pick(req.query, studentFilterAbleField);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await studentService.getAllStudent(
    searchFields,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "all Students retrieved successful",
    data: result?.data,
    meta: result?.meta,
  });
});

const getStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await studentService.getStudent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "single Student retrieved successful",
    data: result,
  });
});
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await studentService.updateStudent(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Student update successful",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await studentService.deleteStudent(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Student delete successful",
    data: result,
  });
});

export const studentController = {
  getAllStudent,
  getStudent,
  updateStudent,
  deleteStudent,
};
