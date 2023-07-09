import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {};
