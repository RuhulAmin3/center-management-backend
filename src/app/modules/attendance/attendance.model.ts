import { Schema, model } from "mongoose";
import { IAttendance } from "./attendance.interface";

const presenceSchema = new Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isPresent: { type: Boolean, required: true },
  },
  { _id: false }
);
const attendanceSchema = new Schema<IAttendance>(
  {
    className: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    date: { type: Date, required: true },
    presence: { type: [presenceSchema], required: true },
  },
  { timestamps: true }
);

export const Attendance = model<IAttendance>("attendance", attendanceSchema);
