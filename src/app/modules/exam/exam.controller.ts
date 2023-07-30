import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { examService } from "./exam.services";
import { pick } from "../../../shared/pick";
import { paginationFields } from "../../../constant/paginationOptions";

const createExam = catchAsync(async (req: Request, res: Response) => {
  const examData = req.body;
  const result = await examService.createExam(examData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "exam created successfully",
    data: result,
  });
});

const getAllExam = catchAsync(async (req: Request, res: Response) => {
  const filterClass = pick(req.query, ["className"]);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await examService.getAllExam(filterClass, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "exam retreived successfully",
    data: result,
  });
});

const getExam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await examService.getExam(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "single exam retreived successfully",
    data: result,
  });
});

const deleteExam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await examService.deleteExam(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "exam deleted successfully",
    data: result,
  });
});

const deleteExamWithExamResult = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await examService.deleteExam(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "exam and exam results deleted successfully",
      data: result,
    });
  }
);

const updateExam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await examService.updateExam(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "exam updated successfully",
    data: result,
  });
});

export const examController = {
  createExam,
  getAllExam,
  deleteExam,
  getExam,
  updateExam,
  deleteExamWithExamResult,
};
