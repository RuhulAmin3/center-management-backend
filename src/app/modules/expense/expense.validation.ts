import { z } from "zod";
import { Month, expenseStatus, expenseType } from "./expense.constant";

const createExpenseZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "expense name is required",
    }),
    totalAmount: z.number({
      required_error: "expense amount is required",
    }),
    pay: z.number({
      required_error: "pay is required",
    }),
    due: z.number().optional(),
    type: z.enum([...expenseType] as [string, ...string[]], {
      required_error: "expense type is required",
    }),
    month: z.enum([...Month] as [string, ...string[]], {
      required_error: "month is required",
    }),
    year: z.string({
      required_error: "year is required",
    }),
    status: z.enum([...expenseStatus] as [string, ...string[]]).optional(),
    date: z
      .string({
        required_error: "expense date is required",
      })
      .transform((str) => new Date(str)),
    teacherId: z.string().optional(),
    shortDescription: z.string().optional(),
  }),
});

const updateExpenseZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    totalAmount: z.number().optional(),
    pay: z.number().optional(),
    due: z.number().optional(),
    type: z.enum([...expenseType] as [string, ...string[]]).optional(),
    month: z.enum([...Month] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    status: z.enum([...expenseStatus] as [string, ...string[]]).optional(),
    date: z
      .string()
      .transform((str) => new Date(str))
      .optional(),
    teacherId: z.string().optional(),
    shortDescription: z.string().optional(),
  }),
});

export const expenseValidation = {
  createExpenseZodSchema,
  updateExpenseZodSchema,
};
