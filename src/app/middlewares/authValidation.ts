import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import config from "../../config";

export const authValidation =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "you are unauthorized user"
        );
      }
      const varifiedUser = verifyToken(token, config.jwt.secret as string);

      req.user = varifiedUser;
      if (roles.length && !roles.includes(varifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "you are forbidden user");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
