import { ErrorRequestHandler } from "express";
import { IGenericErrMessage } from "../../types/error";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode: number = 500;
  let message: string = "internal server error";
  let errorMessages: IGenericErrMessage[] = [];
};
