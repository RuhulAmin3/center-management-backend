import { Types } from "mongoose";

export type IUser = {
  id: string;
  password: string;
  role: string;
  needPasswordChange?: boolean;
  passwordChangeAt?: Date;
  student?: Types.ObjectId;
  teacher?: Types.ObjectId;
  guardian?: Types.ObjectId;
};
