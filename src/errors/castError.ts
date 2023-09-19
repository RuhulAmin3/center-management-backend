import mongoose from "mongoose";
import { IGenericErrMessage, IGenericErrorResponse } from "../types/error";

export const handleCastError = (
  err: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errors: IGenericErrMessage[] = [
    {
      path: err.path,
      message: "invalid id",
    },
  ];
  const message = "Invalid Id";
  const statusCode = 400;
  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};
