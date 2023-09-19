import { Schema, model } from "mongoose";
import { IClass } from "./class.interface";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const classSchema = new Schema<IClass>(
  {
    className: {
      type: String,
      required: true,
      unique: true,
    },
    students: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

classSchema.virtual("studentsInfo", {
  ref: "student",
  localField: "students",
  foreignField: "id",
  justOne: false,
});

classSchema.pre("save", async function (next) {
  const className = await Class.findOne({ className: this.className });
  if (className) {
    throw new ApiError(httpStatus.CONFLICT, "class already exist");
  }
  next();
});

export const Class = model<IClass>("class", classSchema);
