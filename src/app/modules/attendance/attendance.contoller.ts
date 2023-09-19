import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { IAttendance, IFiltersOptions } from "./attendance.interface";
import { attendanceService } from "./attendance.services";
import httpStatus from "http-status";
import { pick } from "../../../shared/pick";
import { attendanceFilterableFields } from "./attendance.constant";
import { paginationFields } from "../../../constant/paginationOptions";

const createAttendance = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await attendanceService.createAttendance(data);
  sendResponse<IAttendance>(res, {
    statusCode: httpStatus.OK,
    message: "attendance saved in database successfully",
    data: result,
  });
});

const getAllAttendance = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, attendanceFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await attendanceService.getAllAttendance(
    filters as IFiltersOptions,
    options
  );
  sendResponse<IAttendance[]>(res, {
    statusCode: httpStatus.OK,
    message: "all attendance retrieved successfully",
    data: result,
  });
});

const getAttendance = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await attendanceService.getAttendance(id);
  sendResponse<IAttendance>(res, {
    statusCode: httpStatus.OK,
    message: "attendance retrieved successfully",
    data: result,
  });
});
const getSingleStudentAttendance = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const filters = pick(req.query, ["month", "year"]);
    const result = await attendanceService.getSingleStudentAttendance(
      id,
      filters as { month: string; year: string }
    );
    sendResponse<IAttendance[]>(res, {
      statusCode: httpStatus.OK,
      message: "student attendance report retrieved successfully",
      data: result,
    });
  }
);

const updateAttendance = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await attendanceService.updateAttendance(id, data);
  sendResponse<IAttendance>(res, {
    statusCode: httpStatus.OK,
    message: "attendance update successfully",
    data: result,
  });
});

const deleteAttendance = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await attendanceService.deleteAttendance(id);
  sendResponse<IAttendance>(res, {
    statusCode: httpStatus.OK,
    message: "attendance delete successfully",
    data: result,
  });
});

export const attendanceController = {
  createAttendance,
  getAllAttendance,
  getAttendance,
  updateAttendance,
  deleteAttendance,
  getSingleStudentAttendance,
};
