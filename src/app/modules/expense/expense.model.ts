import { Schema, model } from "mongoose";
import { IExpense } from "./expense.interface";
import { Month, expenseStatus, expenseType } from "./expense.constant";

const expenseSchema = new Schema<IExpense>(
  {
    name: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    pay: {
      type: Number,
      required: true,
    },
    due: {
      type: Number,
    },
    type: {
      type: String,
      enum: expenseType,
      required: true,
    },
    month: {
      type: String,
      required: true,
      enum: Month,
    },
    year: {
      type: String,
      required: true,
    },
    teacherId: {
      type: String,
    },
    status: {
      type: String,
      enum: expenseStatus,
    },
    shortDescription: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Expense = model<IExpense>("expense", expenseSchema);
