/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Teacher } from "./teacher.model";
import mongoose, { SortOrder } from "mongoose";
import { ISearchFields, ITeacher } from "./teacher.interface";
import { User } from "../user/user.model";
import { IpaginationOptions } from "../../../types/paginations";
import { calculatePagination } from "../../../shared/calculatePagination";
import { teacherSearchAbleField } from "./teacher.constant";
import { genericResponseType } from "../../../types/genericResponse";

const getAllTeacher = async (
  searchFields: ISearchFields,
  paginationFields: IpaginationOptions
): Promise<genericResponseType<ITeacher[]>> => {
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
      $or: teacherSearchAbleField.map((field) => ({
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

  const result = await Teacher.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Teacher.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleTeacher = async (id: string): Promise<ITeacher | null> => {
  const teacher = await Teacher.findOne({ id: id });
  if (!teacher) {
    throw new ApiError(httpStatus.BAD_REQUEST, "teacher does not exist");
  }
  return teacher;
};

const deleteTeacher = async (id: string): Promise<void> => {
  const teacher = await Teacher.findOne({ id: id });
  if (!teacher) {
    throw new ApiError(httpStatus.BAD_REQUEST, "teacher does not exist");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await User.findOneAndDelete({ id }, { session });
    await Teacher.findOneAndDelete({ id }, { session });
    session.commitTransaction();
    session.endSession();
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const updateTeacher = async (
  id: string,
  payload: ITeacher
): Promise<ITeacher | null> => {
  const teacher = await Teacher.findOne({ id });
  if (!teacher) {
    throw new ApiError(httpStatus.BAD_REQUEST, "teacher does not exist");
  }
  const { name, educationalQualification, ...restTeacherData } = payload;
  const updatedTeacherData: Partial<ITeacher> = { ...restTeacherData };

  //   name update dynamically
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}`;
      (updatedTeacherData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (
    educationalQualification &&
    Object.keys(educationalQualification).length > 0
  ) {
    Object.keys(educationalQualification).forEach((key) => {
      const nameKey = `educationalQualification.${key}`;
      (updatedTeacherData as any)[nameKey] =
        educationalQualification[key as keyof typeof educationalQualification];
    });
  }

  const result = await Teacher.findOneAndUpdate({ id }, updatedTeacherData, {
    new: true,
  });
  return result;
};

export const teacherService = {
  getAllTeacher,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
};
