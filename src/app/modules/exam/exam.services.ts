import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IExam, IFilter } from "./exam.interface";
import { Exam } from "./exam.model";
import { IpaginationOptions } from "../../../types/paginations";
import { calculatePagination } from "../../../shared/calculatePagination";
import { SortOrder } from "mongoose";
import { genericResponseType } from "../../../types/genericResponse";

const createExam = async (payload: IExam): Promise<IExam | null> => {
  const result = await Exam.create(payload);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "failed to create exam");
  }
  return result;
};

const getAllExam = async (
  filterClass: IFilter,
  paginationFields: IpaginationOptions
): Promise<genericResponseType<IExam[] | null>> => {
  const { page, skip, limit, sortBy, sortOrder } =
    calculatePagination(paginationFields);

  const sortCondition: { [key: string]: SortOrder } = {};
  const andCondition = [];
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  if (filterClass && Object.entries(filterClass).length > 0) {
    andCondition.push({
      $and: Object.entries(filterClass).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await Exam.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Exam.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getExam = async (id: string): Promise<IExam | null> => {
  const exam = await Exam.findById(id);
  if (!exam) {
    throw new ApiError(httpStatus.NOT_FOUND, "exam not fund");
  }
  return exam;
};

const deleteExam = async (id: string): Promise<void> => {
  const exam = await Exam.findById(id);
  if (!exam) {
    throw new ApiError(httpStatus.NOT_FOUND, "exam not fund");
  }
  await Exam.findByIdAndDelete(id);
};

const deleteExamWithExamResult = async (id: string): Promise<void> => {
  const exam = await Exam.findById(id);
  if (!exam) {
    throw new ApiError(httpStatus.NOT_FOUND, "exam not fund");
  }
  await Exam.findByIdAndDelete(id);
};

const updateExam = async (id: string, data: IExam): Promise<IExam | null> => {
  const exam = await Exam.findById(id);
  if (!exam) {
    throw new ApiError(httpStatus.NOT_FOUND, "exam not found");
  }
  const updatedExam = await Exam.findByIdAndUpdate(id, data, { new: true });
  return updatedExam;
};

export const examService = {
  createExam,
  getAllExam,
  deleteExam,
  getExam,
  updateExam,
  deleteExamWithExamResult,
};
