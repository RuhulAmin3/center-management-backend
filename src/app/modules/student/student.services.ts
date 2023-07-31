/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import mongoose, { SortOrder, Types } from "mongoose";
import { User } from "../user/user.model";
import { IpaginationOptions } from "../../../types/paginations";
import { calculatePagination } from "../../../shared/calculatePagination";
import { genericResponseType } from "../../../types/genericResponse";
import { studentSearchAbleField } from "./student.constant";
import { ExamResultType, ISearchFields, IStudent } from "./student.interface";
import { Student } from "./student.model";

const getAllStudent = async (
  searchFields: ISearchFields,
  paginationFields: IpaginationOptions
): Promise<genericResponseType<IStudent[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationFields);

  const { searchTerm, ...filterData } = searchFields || {};
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: studentSearchAbleField.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  if (filterData && Object.keys(filterData).length > 0) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Student.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getStudent = async (id: string): Promise<IStudent | null> => {
  const student = await Student.findOne({ id: id });
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student does not exist");
  }
  return student;
};

const deleteStudent = async (id: string): Promise<void> => {
  const student = await Student.findOne({ id: id });
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student does not exist");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await User.findOneAndDelete({ id }, { session });
    await Student.findOneAndDelete({ id }, { session });
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const updateStudent = async (
  id: string,
  payload: IStudent
): Promise<IStudent | null> => {
  const student = await Student.findOne({ id });
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student does not exist");
  }
  const { name, guardian, ...restStudentData } = payload || {};
  const updatedStudentData: Partial<IStudent> = { ...restStudentData };
  //   name update dynamically
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}`;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach((key) => {
      const guardianKey = `guardian.${key}`;
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }

  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });
  return result;
};

const addExamResult = async (
  id: string,
  examData: ExamResultType
): Promise<Partial<IStudent | null>> => {
  const isResultExist = await Student.findOne({
    "examsResult.exam": examData.exam,
    // "examsResult.className": examData.className,
  });
  // console.log(isResultExist);

  if (isResultExist) {
    throw new ApiError(
      httpStatus.ALREADY_REPORTED,
      "result already added in your record"
    );
  }

  const updatedResult = await Student.findOneAndUpdate(
    { id },
    {
      $addToSet: {
        examsResult: examData,
      },
    },
    // $addToSet: {
    //   examsResult: { $each: [examData] },
    // },
    // },
    {
      new: true,
    }
  ).select("examsResult");
  return updatedResult;
};

const deleteExamResult = async (
  id: string,
  resultId: string
): Promise<void> => {
  const deletedResultId = new Types.ObjectId(resultId);
  await Student.findOneAndUpdate(
    { id },
    {
      $pull: {
        examsResult: { _id: deletedResultId },
      },
    },
    {
      new: true,
    }
  );
};

export const studentService = {
  getAllStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  addExamResult,
  deleteExamResult,
};
