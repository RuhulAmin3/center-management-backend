import { ZodError } from "zod";
import { IGenericErrMessage, IGenericErrorResponse } from "../types/error";

export const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrMessage[] = err.issues.map((issue) => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));
  const statusCode = 400;
  return {
    statusCode,
    message: "Zod validation Error",
    errorMessages: errors,
  };
};
