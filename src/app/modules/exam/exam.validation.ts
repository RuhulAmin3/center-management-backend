import { z } from "zod";

const createExamZodSchema = z.object({
  body: z.object({
    examName: z.string({
      required_error: "exam name is required",
    }),
    className: z.string({
      required_error: "class name is required",
    }),
    subjects: z
      .array(
        z.object({
          name: z.string({
            required_error: "name is required",
          }),
          totalMark: z.string({
            required_error: "total mark is required",
          }),
        })
      )
      .nonempty({
        message: "you have to add at least one subject",
      }),
    examDate: z.string({
      required_error: "exam date is required",
    }),
  }),
});

const updateExamZodSchema = z.object({
  body: z.object({
    examName: z.string().optional(),
    className: z.string().optional(),
    subjects: z
      .array(
        z.object({
          name: z.string().optional(),
          totalMark: z.string().optional(),
        })
      )
      .nonempty({
        message: "you have to add at least one subject",
      }),
    examDate: z.string(),
  }),
});

export const examValidation = {
  createExamZodSchema,
  updateExamZodSchema,
};
