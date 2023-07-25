import { Schema, model } from "mongoose";
import { IExam } from "./exam.interface";

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  totalMark: {
    type: String,
    required: true,
  },
});

const examSchema = new Schema<IExam>(
  {
    examName: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    subjects: {
      type: [subjectSchema],
      required: true,
    },
    examDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Exam = model<IExam>("exam", examSchema);
