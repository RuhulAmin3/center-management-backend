import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IAttendance, IFiltersOptions } from "./attendance.interface";
import { Attendance } from "./attendance.model";
import { IpaginationOptions } from "../../../types/paginations";
import { attendanceSearchableFields } from "./attendance.constant";

const createAttendance = async (data: IAttendance): Promise<IAttendance> => {
  const isExist = await Attendance.findOne({
    date: data.date,
    month: data.month,
    year: data.year,
  });

  if (isExist) {
    const date = new Date(data.date);
    throw new ApiError(
      httpStatus.CONFLICT,
      `${date.toLocaleDateString("en-US")} attendance already exist for ${
        data.month
      } month`
    );
  }

  const result = await Attendance.create(data);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "failed to create attendance");
  }
  return result;
};

const getAllAttendance = async (
  filtersOption: IFiltersOptions,
  paginationOptions: IpaginationOptions
) => {
  const { searchTerm, ...filterData } = filtersOption;
  console.log(paginationOptions);
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: attendanceSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.entries(filterData).length > 0) {
    //filterData should be case sensitive
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: {
          $eq: value,
        },
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Attendance.find(whereCondition);
  //   .populate({
  //     path: "presence",
  //     populate: [{ path: "studentId" }],
  //   });

  return result;
};

const getAttendance = async (id: string): Promise<IAttendance> => {
  const result = await Attendance.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "attendance not found");
  }
  return result;
};

const getSingleStudentAttendance = async (
  id: string,
  filters: { month: string; year: string }
): Promise<IAttendance[]> => {
  const result = await Attendance.find({
    $and: [
      { month: filters.month }, // case sensitive
      { year: filters.year },
      {
        presence: {
          $elemMatch: {
            studentId: id,
          },
        },
      },
    ],
  });

  if (result.length === 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "attendence report not found of this student"
    );
  }
  return result;
};

const deleteAttendance = async (id: string): Promise<IAttendance> => {
  const result = await Attendance.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "attendance not found");
  }

  await Attendance.findByIdAndDelete(id);

  return result;
};

const updateAttendance = async (
  id: string,
  data: Partial<IAttendance>
): Promise<IAttendance> => {
  const result = await Attendance.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "attendance not found");
  }

  const updatedResult = await Attendance.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!updatedResult) {
    throw new ApiError(httpStatus.BAD_REQUEST, "failed to update attendance");
  }

  return updatedResult;
};

export const attendanceService = {
  createAttendance,
  getAllAttendance,
  getAttendance,
  updateAttendance,
  deleteAttendance,
  getSingleStudentAttendance,
};
