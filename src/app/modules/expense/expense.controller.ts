import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import { sendResponse } from "../../../shared/sendResponse";
import { expenseService } from "./expense.services";
import { pick } from "../../../shared/pick";
import { expenseFilterAbleField } from "./expense.constant";
import { paginationFields } from "../../../constant/paginationOptions";

const createExpense = catchAsync(async (req: Request, res: Response) => {
  const expenseData = req.body;
  const result = await expenseService.createExpense(expenseData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "expense added successfully",
    data: result,
  });
});

const getAllExpenses = catchAsync(async (req: Request, res: Response) => {
  const filterFields = pick(req.query, expenseFilterAbleField);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await expenseService.getAllExpenses(
    filterFields,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "all expense retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleExpense = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await expenseService.getSingleExpense(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "single expense retrieved successfully",
    data: result,
  });
});

const updateExpense = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const expenseData = req.body;
  const result = await expenseService.updateExpense(id, expenseData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "expense updated successfully",
    data: result,
  });
});

const deleteExpense = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await expenseService.deleteExpense(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "expense deleted successfully",
    data: result,
  });
});

export const expenseController = {
  createExpense,
  getAllExpenses,
  getSingleExpense,
  updateExpense,
  deleteExpense,
};
