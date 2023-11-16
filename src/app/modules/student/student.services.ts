/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import mongoose, { SortOrder, Types } from "mongoose";
import { User } from "../user/user.model";
import { IpaginationOptions } from "../../../types/paginations";
import { calculatePagination } from "../../../shared/calculatePagination";
import { genericResponseType } from "../../../types/genericResponse";
import { studentSearchAbleField } from "./student.constant";
import {
  ExamResultType,
  ISearchFields,
  IStudent,
  TransactionHistoryType,
} from "./student.interface";
import { Student } from "./student.model";
import {
  calculateGradeAndPoint,
  gradeCalculation,
} from "../../../utils/gradeCalculation";

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
  examResultData: ExamResultType
): Promise<Partial<IStudent | null>> => {
  const isResultExist = await Student.findOne({
    $and: [
      { id },
      { examsResult: { $elemMatch: { exam: examResultData?.exam } } },
    ],
  });
  // .select({ examsResult: { $elemMatch: { exam: examData?.exam } } });
  const isValidClassExamResult = await Student.findOne({
    className: examResultData.className,
  });
  if (!isValidClassExamResult) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `${examResultData.examName} result is not for class ${examResultData.className}.`
    );
  }

  if (isResultExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `${examResultData.examName} result already added in your record`
    );
  }

  let totalPoint = 0;
  const gradedSubjects = examResultData?.subject.map((sub) => {
    const { grade, point } = calculateGradeAndPoint(
      sub.obtainedMark,
      sub.totalMark
    );
    totalPoint += point * 4;
    sub.grade = grade;
    sub.point = point;
    return sub;
  });

  const gpa = Number((totalPoint / (gradedSubjects.length * 4)).toFixed(2)); // each subject credit is 4

  const grade = gradeCalculation(gpa);
  examResultData.GPA = gpa;
  examResultData.grade = grade;
  examResultData.subject = gradedSubjects;

  console.log(examResultData);

  const updatedResult = await Student.findOneAndUpdate(
    { id },
    {
      $addToSet: {
        examsResult: examResultData,
      },
    },
    {
      new: true,
    }
  ).select("examsResult");

  return updatedResult;
};

const updateExamResult = async (
  id: string,
  examData: ExamResultType
): Promise<Partial<IStudent | null>> => {
  const isResultExist = await Student.findOne({
    $and: [{ id }, { examResult: { $elemMatch: { exam: examData.exam } } }],
  });
  // console.log(isResultExist);

  if (!isResultExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `${examData.examName} result not found in your record`
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
}; // it will be done later

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

const addTransaction = async (
  id: string,
  transactionData: TransactionHistoryType
): Promise<Partial<IStudent | null>> => {
  const isTransactionExist = await Student.findOne({
    $and: [
      { id },
      {
        transactionHistory: {
          $elemMatch: {
            month: transactionData.month,
            year: transactionData.year,
          },
        },
      },
    ],
  });

  if (isTransactionExist) {
    throw new ApiError(
      httpStatus.ALREADY_REPORTED,
      `Fee already provided for this ${transactionData.month} month of the year ${transactionData.year}`
    );
  }

  const updatedResult = await Student.findOneAndUpdate(
    { id },
    {
      $addToSet: {
        transactionHistory: transactionData,
      },
    },
    // $addToSet: {
    //   transactionHistory: { $each: [transactionData] },
    // },
    // },
    {
      new: true,
    }
  ).select("transactionHistory");
  return updatedResult;
};

const updateTransaction = async (
  id: string, // id means studentId to find specific student
  transactionId: string, //transactionId to find specific transaction for update
  transactionData: TransactionHistoryType
): Promise<Partial<IStudent | null>> => {
  const isTransactionExist = await Student.findOne({
    $and: [
      { id },
      {
        transactionHistory: {
          $elemMatch: {
            month: transactionData.month,
            year: transactionData.year,
          },
        },
      },
    ],
  }).select({
    transactionHistory: {
      $elemMatch: {
        month: transactionData.month,
        year: transactionData.year,
      },
    },
  });

  console.log(isTransactionExist);

  if (isTransactionExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `transaction already exist pay for another month`
    );
  }

  const updatedTransactionId = new Types.ObjectId(transactionId);
  const updatedTransaction = await Student.findOneAndUpdate(
    {
      id,
      transactionHistory: {
        $elemMatch: {
          _id: updatedTransactionId,
        },
      },
    },
    {
      $set: {
        "transactionHistory.$": transactionData,
      },
    },
    {
      new: true,
    }
  ).select("transactionHistory");
  return updatedTransaction;
}; // it will be done later

const deleteTransaction = async (
  id: string,
  transactionId: string
): Promise<void> => {
  const deletedTransactionId = new Types.ObjectId(transactionId);
  await Student.findOneAndUpdate(
    { id },
    {
      $pull: {
        transactionHistory: { _id: deletedTransactionId },
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
  updateExamResult, // in update exam result has some issues
  addTransaction,
  updateTransaction, // in update transaction has some issues
  deleteTransaction,
};
