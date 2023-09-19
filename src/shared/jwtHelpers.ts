import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { IJWTData } from "../types/jwtData";

const createToken = (
  data: IJWTData,
  secret: Secret,
  expireTime: string
): string => {
  const token = jwt.sign(data, secret, { expiresIn: expireTime });
  return token;
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtUtils = {
  createToken,
  verifyToken,
};
