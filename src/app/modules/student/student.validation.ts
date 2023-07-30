import { z } from "zod";
import { gender } from "../teacher/teacher.constant";

const updateStudentZodSchema = z.object({
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
});

export const studentValidation = {
  updateStudentZodSchema,
};
