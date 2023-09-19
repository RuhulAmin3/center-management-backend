import { Schema, model } from "mongoose";
import { bloodGroup, gender } from "../teacher/teacher.constant";
import { guardianStatus } from "./guardian.constant";
import { IGuardian } from "./guardian.interface";

const guardianSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    mykids: {
      type: [String],
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: gender,
    },
    email: {
      type: String,
    },
    professions: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: guardianStatus,
      default: "pending",
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Guardian = model<IGuardian>("guardian", guardianSchema);
