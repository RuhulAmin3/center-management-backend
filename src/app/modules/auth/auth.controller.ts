import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { authService } from "./auth.service";
import httpStatus from "http-status";
import { IJWTData } from "../../../types/jwtData";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const { refreshToken, ...others } = await authService.loginUser(data);

  res.cookie("refreshToken", refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "user login successful",
    data: others,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const user = req.user;
  const result = await authService.changePassword(user as IJWTData, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "password successfully changes",
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await authService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "new access token generate by refresh token",
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
  refreshToken,
};
