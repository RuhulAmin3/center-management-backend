import httpStatus from "http-status";
import { IExpense, IFilterFields } from "./expense.interface";
import { Expense } from "./expense.model";
import ApiError from "../../../errors/ApiError";
import { calculatePagination } from "../../../shared/calculatePagination";
import { genericResponseType } from "../../../types/genericResponse";
import { IpaginationOptions } from "../../../types/paginations";
import { SortOrder } from "mongoose";
import { expenseSearchAbleField } from "./expense.constant";

const createExpense = async (payload: IExpense): Promise<IExpense | null> => {
  const result = await Expense.create(payload);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "failed to create Expense");
  }
  return result;
};

const getAllExpenses = async (
  filterOptions: IFilterFields,
  paginationFields: IpaginationOptions
): Promise<genericResponseType<IExpense[] | null>> => {
  console.log(filterOptions);
  const { page, skip, limit, sortBy, sortOrder } =
    calculatePagination(paginationFields);

  const { searchTerm, ...filterData } = filterOptions || {};
  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: expenseSearchAbleField.map((field) => ({
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
        [field]: value, // case sensitive
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  console.log(JSON.stringify(whereCondition));
  const result = await Expense.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Expense.countDocuments(whereCondition);
  if (result.length === 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "there is no expense record found"
    );
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

const getSingleExpense = async (id: string): Promise<IExpense | null> => {
  const result = await Expense.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Expense not fund");
  }
  return result;
};

const deleteExpense = async (id: string): Promise<void> => {
  const result = await Expense.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Expense not fund");
  }
  await Expense.findByIdAndDelete(id);
};

const updateExpense = async (
  id: string,
  data: IExpense
): Promise<IExpense | null> => {
  const result = await Expense.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Expense not found");
  }
  const updatedExpense = await Expense.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedExpense;
};

export const expenseService = {
  createExpense,
  getAllExpenses,
  getSingleExpense,
  updateExpense,
  deleteExpense,
};
