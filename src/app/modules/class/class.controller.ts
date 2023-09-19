import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { classService } from "./class.services";
import httpStatus from "http-status";
import { pick } from "../../../shared/pick";
import { paginationFields } from "../../../constant/paginationOptions";

const addNewClass = catchAsync(async (req: Request, res: Response) => {
  const classData = req.body;
  const result = await classService.addNewClass(classData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "class created successfully",
    data: result,
  });
});
const getAllClasses = catchAsync(async (req: Request, res: Response) => {
  const paginationfields = pick(req.query, paginationFields);
  const filtersOptions = pick(req.query, ["className"]);
  const result = await classService.getAllClasses(
    paginationfields,
    filtersOptions as { className: string }
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "all Classes retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getsingleClass = catchAsync(async (req: Request, res: Response) => {
  const className = req.params.className;
  const result = await classService.getSingleClass(className);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "single class retrieved successfully",
    data: result,
  });
});

const deleteClass = catchAsync(async (req: Request, res: Response) => {
  const className = req.params.className;
  const result = await classService.deleteClass(className);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "class deleted successfully",
    data: result,
  });
});

const updateClass = catchAsync(async (req: Request, res: Response) => {
  const className = req.params.className;
  const data = req.body;
  const result = await classService.updateClass(className, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "class updated successfully",
    data: result,
  });
});

export const classController = {
  addNewClass,
  getAllClasses,
  getsingleClass,
  deleteClass,
  updateClass,
};
