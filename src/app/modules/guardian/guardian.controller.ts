import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { guardianService } from "./guardian.service";
import { pick } from "../../../shared/pick";
import { guardianFilterAbleField } from "./guardian.constant";
import { paginationFields } from "../../../constant/paginationOptions";

const getAllGuardian = catchAsync(async (req: Request, res: Response) => {
  const searchFields = pick(req.query, guardianFilterAbleField);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await guardianService.getAllGuardian(
    searchFields,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "all guardian retrieved successfully",
    data: result?.data,
    meta: result?.meta,
  });
});

const getSingleGuardian = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await guardianService.getSingleGuardian(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "single guardian retrieved successfully",
    data: result,
  });
});

const approvedOrRejectAccount = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const status = req.body.status;
    const result = await guardianService.approvedOrRejectAccount(id, status);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "account status updated",
      data: result,
    });
  }
);

const updateGuardian = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await guardianService.updateGuardian(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "guardian update successful",
    data: result,
  });
});

const deleteGuardian = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await guardianService.deleteGuardian(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "guardian account deleted successfully",
    data: result,
  });
});

export const guardianController = {
  getAllGuardian,
  getSingleGuardian,
  updateGuardian,
  deleteGuardian,
  approvedOrRejectAccount,
};
