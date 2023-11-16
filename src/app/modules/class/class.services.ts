import mongoose, { SortOrder } from "mongoose";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IClass } from "./class.interface";
import { Class } from "./class.model";
import { IpaginationOptions } from "../../../types/paginations";
import { calculatePagination } from "../../../shared/calculatePagination";
import { genericResponseType } from "../../../types/genericResponse";
import { Exam } from "../exam/exam.model";
import { Student } from "../student/student.model";

const addNewClass = async (payload: IClass): Promise<IClass> => {
  const result = await Class.create(payload);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "failed to create class");
  }
  return result;
};

const getAllClasses = async (
  paginationFields: IpaginationOptions,
  filtersOption: { className: string }
): Promise<genericResponseType<IClass[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationFields);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    Object.keys(filtersOption).length > 0 ? filtersOption : {};
  const result = await Class.find(whereCondition)
    .populate("studentsInfo")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .exec();
  const total = await Class.countDocuments(whereCondition);
  if (result.length == 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "there is no class added.");
  }
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleClass = async (className: string): Promise<IClass> => {
  const result = await Class.findOne({ className })
    .populate("studentInfo")
    .exec();
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "class not found");
  }
  return result;
};

const deleteClass = async (className: string): Promise<IClass> => {
  const result = await Class.findOne({ className });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "class not found");
  }
  if (result.students.length > 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "you have to delete all the student of this class first to delete the perticular class"
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await Class.findOneAndDelete({ className: result.className }, { session });
    await Exam.findOneAndDelete({ className: result.className }, { session });
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
  return result;
};

const updateClass = async (
  className: string,
  updateData: Partial<IClass>
): Promise<IClass | null> => {
  const result = await Class.findOne({ className });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "class not found");
  }

  const isClassExist = await Class.findOne({ className: updateData.className });

  if (isClassExist) {
    throw new ApiError(httpStatus.CONFLICT, "class already exist.");
  }

  const session = await mongoose.startSession();
  let updatedResult;
  try {
    session.startTransaction();
    updatedResult = await Class.findOneAndUpdate(
      { className: result.className },
      updateData,
      { new: true, session }
    );
    await Student.updateMany(
      { className: result.className },
      {
        $set: {
          className: updateData.className,
          transactionHistory: [],
          examsResult: [],
        },
      },
      {
        new: true,
        session,
      }
    );
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
  return updatedResult;
};

export const classService = {
  addNewClass,
  getAllClasses,
  getSingleClass,
  deleteClass,
  updateClass,
};
