import { z } from "zod";

const createAttendanceZodSchema = z.object({
  body: z.object({
    className: z.string({
      required_error: "class name is required",
    }),
    date: z
      .string({
        required_error: "attendance date is required",
      })
      .transform((str) => new Date(str)),
    month: z.string({
      required_error: "month is required",
    }),
    year: z.string({
      required_error: "year is required",
    }),
    presence: z
      .array(
        z.object({
          studentId: z.string({
            required_error: "student id is required",
          }),
          name: z.string({
            required_error: "name is required",
          }),
          isPresent: z.boolean({
            required_error: "is present or not is required",
          }),
        })
      )
      .nonempty({ message: "presence cannot be empty" }),
  }),
});

export const attendanceValidation = {
  createAttendanceZodSchema,
};
