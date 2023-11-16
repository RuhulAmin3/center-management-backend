import { z } from "zod";
import { bloodGroup, gender } from "../teacher/teacher.constant";
import { guardianStatus } from "../guardian/guardian.constant";

export const createTeacherZodSchema = z.object({
  password: z.string().optional(),
  teacher: z.object({
    name: z.object({
      firstName: z.string({
        required_error: "first name is required",
      }),
      middleName: z.string().optional(),
      lastName: z.string({
        required_error: "last name is required",
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: "gender is required",
      }),
      dateOfBirth: z.string({
        required_error: "date of birth is required",
      }),
      email: z
        .string({
          required_error: "email is required",
        })
        .email(),
      contactNo: z.string({
        required_error: "contact no is required",
      }),
      emergencyContactNo: z.string().optional(),
      educationalQualification: z.object({
        universityName: z.string({
          required_error: "university name is required",
        }),
        subject: z.string({
          required_error: "subject name is required",
        }),
        result: z.string().optional(),
        isGraduate: z.boolean({
          required_error: "graduate complete or not is required",
        }),
        year: z.string().optional(),
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      subject: z.string({
        required_error: "subject is required",
      }),
      designation: z.string({
        required_error: "designation is required",
      }),
      salary: z.string().optional(),
      presentAddress: z.string({
        required_error: "present address is required",
      }),
      permanentAddress: z.string().optional(),
      shortDescription: z.string().optional(),
      image: z.string().optional(),
    }),
  }),
});

export const createStudentZodSchema = z.object({
  password: z.string().optional(),
  student: z.object({
    name: z.object(
      {
        firstName: z.string({
          required_error: "first name is required",
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: "last name is required",
        }),
      },
      { required_error: "name is required" }
    ),
    gender: z.enum([...gender] as [string, ...string[]], {
      required_error: "gender is required",
    }),
    dateOfBirth: z.string({
      required_error: "date of birth is required",
    }),
    admissionYear: z.string({ required_error: "admission year is required" }),
    email: z.string().email().optional(),
    contactNo: z.string({
      required_error: "contact no is required",
    }),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    emergencyContactNo: z.string().optional(),
    guardian: z.object(
      {
        fatherName: z.string({
          required_error: "father name is required",
        }),
        fatherOccupation: z.string({
          required_error: "father occupation is required",
        }),
        fatherContactNo: z.string({
          required_error: "father contact no is required",
        }),
        motherName: z.string({
          required_error: "mother name is required",
        }),
        motherOccupation: z.string({
          required_error: "mother occupation is required",
        }),
        motherContactNo: z.string({
          required_error: "mother contact no is required",
        }),
      },
      { required_error: "guardian information is required" }
    ),
    className: z.string({
      required_error: "class name is required",
    }),
    classRoll: z.string({
      required_error: "class roll is required",
    }),
    section: z.string({
      required_error: "section is required",
    }),
    schoolName: z.string({
      required_error: "school name is required",
    }),
    image: z.string().optional(),
    presentAddress: z.string({
      required_error: "present address is required",
    }),
    permanentAddress: z.string().optional(),
    shortDescription: z.string().optional(),
    // transactionHistory: z.array(TransactionHistorySchema).optional(),
    // examsResult: z
    //   .array(
    //     z.object({
    //       examName: z.string({
    //         required_error: "exam name is required",
    //       }),
    //       className: z.string({
    //         required_error: "class name is required",
    //       }),
    //       subject: z
    //         .array(
    //           z.object({
    //             subjectName: z.string({
    //               required_error: "subject name is required",
    //             }),
    //             totalMark: z.string({
    //               required_error: "total mark is required",
    //             }),
    //             obtainedMark: z.string({
    //               required_error: "obtained mark is required",
    //             }),
    //           })
    //         )
    //         .nonempty(),
    //       exam: z.string({
    //         required_error: "exam is required",
    //       }),
    //     })
    //   )
    //   .optional(),
  }),
});

export const createGuardianZodSchema = z.object({
  password: z
    .string({ required_error: "password is required" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message:
        "password must be minimum eight characters including at least one letter and one number",
    }),
  guardian: z.object({
    firstName: z
      .string()
      .refine((value) => !!value, { message: "First name is required" }),
    lastName: z
      .string()
      .refine((value) => !!value, { message: "Last name is required" }),
    mykids: z.array(z.string()).refine((value) => value.length > 0, {
      message: "At least one kid is required",
    }),
    gender: z
      .enum([...gender] as [string, ...string[]])
      .refine((value) => !!value, { message: "Gender is required" }),
    email: z
      .string()
      .email({ message: "provide valid email address" })
      .optional(),
    professions: z
      .string()
      .refine((value) => !!value, { message: "Profession is required" }),
    contactNo: z
      .string()
      .refine((value) => !!value, { message: "Contact number is required" }),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z.enum(bloodGroup as [string, ...string[]]).optional(),
    image: z.string().optional(),
    status: z.enum(guardianStatus as [string, ...string[]]).optional(),
    presentAddress: z
      .string()
      .refine((value) => !!value, { message: "Present address is required" }),
    permanentAddress: z.string().optional(),
    shortDescription: z.string().optional(),
  }),
});
