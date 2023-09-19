import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { ILoginResponse, ILoginUser, IPassword } from "./auth.interface";
import ApiError from "../../../errors/ApiError";
import { Secret } from "jsonwebtoken";
import { jwtUtils } from "../../../shared/jwtHelpers";
import config from "../../../config";
import { IJWTData } from "../../../types/jwtData";

const loginUser = async (loginData: ILoginUser): Promise<ILoginResponse> => {
  const user = await User.findOne({ id: loginData.id });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "user does not exist");
  }

  const isPasswordMatched = bcrypt.compare(loginData.password, user.password);

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "wrong credientials");
  }

  const tokenData = { userId: user.id, role: user.role };

  const accessToken = jwtUtils.createToken(
    tokenData,
    config.jwt.access_secret as Secret,
    config.jwt.access_expire_time as string
  );

  const refreshToken = jwtUtils.createToken(
    tokenData,
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expire_time as string
  );

  return {
    needPasswordChange: user.needPasswordChange!,
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  user: IJWTData,
  payload: IPassword
): Promise<void> => {
  const isExist = await User.findOne({ id: user.userId });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "user does not exist");
  }

  const isPasswordMatched = bcrypt.compare(
    payload.oldPassword,
    isExist.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, "old password does not match");
  }

  const newPassword = bcrypt.hashSync(payload.newPassword, 8);
  isExist.password = newPassword;
  isExist.save();
};

const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtUtils.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, "invalid refresh token");
  }

  const { userId } = verifiedToken;

  const isUserExist = await User.findOne({ id: userId });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "user does not exist");
  }

  const tokenData = { userId: isUserExist.id, role: isUserExist.role };

  const newAccessToken = jwtUtils.createToken(
    tokenData,
    config.jwt.access_secret as Secret,
    config.jwt.access_expire_time as string
  );

  return { accessToken: newAccessToken };
};

export const authService = {
  loginUser,
  changePassword,
  refreshToken,
};
