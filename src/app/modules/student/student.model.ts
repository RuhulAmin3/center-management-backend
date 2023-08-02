import { Schema, model } from "mongoose";
import { IStudent } from "./student.interface";
import { bloodGroup, gender, month } from "../teacher/teacher.constant";

const TransactionHistorySchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    enum: month,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  pay: { type: Number, required: true },
  due: { type: Number, default: 0 },
  status: { type: String },
  shortDescription: { type: String },
});

const ExamResultSubjectsSchema = new Schema(
  {
    subjectName: { type: String, required: true },
    totalMark: { type: Number, required: true },
    obtainedMark: { type: Number, required: true },
    point: { type: Number, required: true },
    grade: { type: String, required: true },
  }
  // { _id: false }
);

const ExamResultSchema = new Schema(
  {
    examName: { type: String, required: true },
    className: { type: String, required: true },
    subject: { type: [ExamResultSubjectsSchema], required: true },
    exam: { type: Schema.Types.ObjectId, required: true, ref: "exam" },
    GPA: { type: Number, required: true },
    grade: { type: String, required: true },
  },
  { _id: false }
);

const studentSchema = new Schema<IStudent>(
  {
    id: { type: String, required: true },
    name: {
      type: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
      },
      required: true,
    },
    gender: { type: String, enum: gender, required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    guardian: {
      type: {
        fatherName: { type: String, required: true },
        fatherOccupation: { type: String, required: true },
        fatherContactNo: { type: String, required: true },
        motherName: { type: String, required: true },
        motherOccupation: { type: String, required: true },
        motherContactNo: { type: String, required: true },
      },
      required: true,
    },
    className: { type: String, required: true },
    classRoll: { type: String, required: true },
    section: { type: String, required: true },
    schoolName: { type: String, required: true },
    image: { type: String },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String },
    shortDescription: { type: String },
    transactionHistory: {
      type: [TransactionHistorySchema],
      default: [],
    },
    examsResult: {
      type: [ExamResultSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Student = model<IStudent>("student", studentSchema);
