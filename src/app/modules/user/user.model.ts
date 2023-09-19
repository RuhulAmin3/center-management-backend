import { Schema, Types, model } from "mongoose";
import { IUser } from "./user.interface";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    student: {
      type: Types.ObjectId,
      ref: "student",
    },
    teacher: {
      type: Types.ObjectId,
      ref: "teacher",
    },
    guardian: {
      type: Types.ObjectId,
      ref: "guardian",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  const user = await User.findOne({ id: this.id });
  if (user) {
    throw new ApiError(httpStatus.CONFLICT, "user already exist");
  }
  const hashPassword = bcrypt.hashSync(this.password as string, 8);
  this.password = hashPassword;
  next();
});

export const User = model<IUser>("user", userSchema);
