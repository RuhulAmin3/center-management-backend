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

// exam result controller
const addExamResult = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const resultData = req.body;
  const result = await studentService.addExamResult(id, resultData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: " result added successful",
    data: result,
  });
});

const deleteExamResult = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const resultId = req.body.id;
  const result = await studentService.deleteExamResult(id, resultId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: " result deleted successful",
    data: result,
  });
});

// transaction controller
const addTransaction = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const transactionData = req.body;
  const result = await studentService.addTransaction(id, transactionData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: " transaction added successful",
    data: result,
  });
});
const updateTransaction = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: transactionId, ...transactionData } = req.body;
  const result = await studentService.updateTransaction(
    id,
    transactionId,
    transactionData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: " transaction updated successful",
    data: result,
  });
});

const deleteTransaction = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const transactionId = req.body.id;
  const result = await studentService.deleteTransaction(id, transactionId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: " transaction deleted successful",
    data: result,
  });
});

export const studentController = {
  getAllStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  addExamResult,
  deleteExamResult,
  addTransaction,
  deleteTransaction,
  updateTransaction,
};
