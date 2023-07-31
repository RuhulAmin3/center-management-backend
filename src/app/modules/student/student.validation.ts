import { z } from "zod";
import { gender } from "../teacher/teacher.constant";

const updateStudentZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    guardian: z
      .object({
        fatherName: z.string().optional(),
        fatherOccupation: z.string().optional(),
        fatherContactNo: z.string().optional(),
        motherName: z.string().optional(),
        motherOccupation: z.string().optional(),
        motherContactNo: z.string().optional(),
      })
      .optional(),
    className: z.string().optional(),
    classRoll: z.string().optional(),
    section: z.string().optional(),
    schoolName: z.string().optional(),
    image: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    shortDescription: z.string().optional(),
  }),
});

const addExamResultZodSchema = z.object({
  body: z.object({
    examName: z.string({
      required_error: "exam name is required",
    }),
    className: z.string({
      required_error: "class name is required",
    }),
    subject: z
      .array(
        z.object({
          subjectName: z.string({
            required_error: "subject name is required",
          }),
          totalMark: z.string({
            required_error: "total mark is required",
          }),
          obtainedMark: z.string({
            required_error: "obtained mark is required",
          }),
        })
      )
      .nonempty({ message: "you have to add at least one subject" }),
    exam: z.string({
      required_error: "exam reference is required",
    }),
  }),
});
const deleteExamResultZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "exam result Id is required",
    }),
  }),
});

export const studentValidation = {
  updateStudentZodSchema,
  addExamResultZodSchema,
  deleteExamResultZodSchema,
};
