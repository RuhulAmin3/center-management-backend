import { z } from "zod";
import { bloodGroup, gender } from "./teacher.constant";

export const updateTeacherZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    educationalQualification: z.object({
      universityName: z.string().optional(),
      subject: z.string().optional(),
      result: z.string().optional(),
      isGraduate: z.boolean().optional(),
      year: z.string().optional(),
    }),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    subject: z.string().optional(),
    designation: z.string().optional(),
    salary: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    shortDescription: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const teacherValidation = { updateTeacherZodSchema };
