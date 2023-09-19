import mongoose, { SortOrder } from "mongoose";
import { calculatePagination } from "../../../shared/calculatePagination";
import { IpaginationOptions } from "./../../../types/paginations";
import { guardianSearchAbleField } from "./guardian.constant";
import { IFilterAbleFields, IGuardian } from "./guardian.interface";
import { Guardian } from "./guardian.model";
import { genericResponseType } from "../../../types/genericResponse";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../user/user.model";

const getAllGuardian = async (
  filtersFields: IFilterAbleFields,
  paginationOptions: IpaginationOptions
): Promise<genericResponseType<IGuardian[]>> => {
  const { searchTerm, ...filtersData } = filtersFields;

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: guardianSearchAbleField.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.entries(filtersData).length > 0) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Guardian.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Guardian.countDocuments(whereCondition);
  const totalPages = Math.ceil(total / limit);
  const previousPage = page - 1 > 0 ? page - 1 : null;
  const nextPage = page + 1 <= totalPages ? page + 1 : null;
  if (result.length == 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "any guardian account not found by this query"
    );
  }

  return {
    meta: {
      page,
      limit,
      total,
      totalPages,
      previousPage,
      nextPage,
    },
    data: result,
  };
};

const getSingleGuardian = async (guardianId: string): Promise<IGuardian> => {
  const result = await Guardian.findOne({
    id: guardianId,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "guardian not found");
  }

  return result;
};

const updateGuardian = async (
  guardianId: string,
  data: Partial<IGuardian>
): Promise<IGuardian | null> => {
  const result = await Guardian.findOne({ id: guardianId });
  console.log("guardianId", guardianId, data);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "guadian information not found");
  }
  const updatedResult = await Guardian.findOneAndUpdate(
    {
      id: guardianId,
    },
    data,
    { new: true }
  );

  return updatedResult;
};

const deleteGuardian = async (id: string) => {
  const findGuardian = await Guardian.findOne({ id });
  if (!findGuardian) {
    throw new ApiError(httpStatus.NOT_FOUND, "guardian does not exist");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await User.findOneAndDelete({ id }, { session });
    await Guardian.findOneAndDelete({ id }, { session });
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const approvedOrRejectAccount = async (
  id: string,
  status: string //status will come from client side.
): Promise<IGuardian | { message: string } | null> => {
  const findGuardian = await Guardian.findOne({ id });
  if (!findGuardian) {
    throw new ApiError(httpStatus.NOT_FOUND, "guardian account not found");
  }

  if (status === "active") {
    const activeGuardianAccount = await Guardian.findOneAndUpdate(
      { id },
      { status },
      { new: true }
    );

    return activeGuardianAccount;
  } else if (status === "reject") {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      await User.findOneAndDelete({ id }, { session });
      await Guardian.findOneAndDelete({ id }, { session });
      await session.commitTransaction();
      await session.endSession();
    } catch (err) {
      await session.abortTransaction();
      await session.endSession();
      throw err;
    }

    return {
      message:
        "your information is not valid. Try to create an account with valid information",
    };
  } else {
    await Guardian.findOneAndUpdate({ id }, { status }, { new: true });
    return {
      message: "your account is now pending! waiting for admin approval.",
    };
  }
};

export const guardianService = {
  getAllGuardian,
  getSingleGuardian,
  updateGuardian,
  deleteGuardian,
  approvedOrRejectAccount,
};
