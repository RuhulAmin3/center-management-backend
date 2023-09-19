import { z } from "zod";
import { bloodGroup, gender } from "../teacher/teacher.constant";
import { guardianStatus } from "./guardian.constant";

const updateGuardianZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    mykids: z
      .array(z.string())
      .nonempty({
        message: "you have to be at least one kids",
      })
      .optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    email: z.string().optional(),
    professions: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z.enum(bloodGroup as [string, ...string[]]).optional(),
    image: z.string().optional(),
    status: z.enum(guardianStatus as [string, ...string[]]).optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    shortDescription: z.string().optional(),
  }),
});

export const guardianValidation = {
  updateGuardianZodSchema,
};
