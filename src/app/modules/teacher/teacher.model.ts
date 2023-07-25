import { Schema, model } from "mongoose";
import { ITeacher } from "./teacher.interface";
import { bloodGroup, gender, month } from "./teacher.constant";

const AttendanceSchema = new Schema({
  date: { type: Date, required: true },
  month: { type: String, required: true, enum: month },
  isPresent: { type: Boolean, required: true },
  shortDescription: { type: String },
});

const TransactionHistorySchema = new Schema({
  date: { type: Date, required: true },
  total: { type: String, required: true },
  month: { type: String, required: true, enum: month },
  pay: { type: String, required: true },
  due: { type: String, required: true },
  status: { type: String },
  shortDescription: { type: String },
});

const EducationalQualificationSchema = new Schema({
  universityName: { type: String, required: true },
  subject: { type: String, required: true },
  result: { type: String },
  isGraduate: { type: Boolean, required: true },
  year: { type: String },
});

const teacherSchema = new Schema<ITeacher>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: gender,
  },
  bloodGroup: {
    type: String,
    enum: bloodGroup,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
  },
  designation: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
    // maxlength: 250,
  },
  educationalQualification: {
    type: EducationalQualificationSchema,
    required: true,
  },
  attendance: {
    type: [AttendanceSchema],
    default: [],
  },
  transactionHistory: {
    type: [TransactionHistorySchema],
    default: [],
  },
});

export const Teacher = model<ITeacher>("teacher", teacherSchema);
