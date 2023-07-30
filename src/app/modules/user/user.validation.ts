import { z } from "zod";
import { bloodGroup, gender } from "../teacher/teacher.constant";

// export const createStudentZodSchema = z.object({
//   body: z.object({
//     password: z.string().optional(),
//     student: z.object({
//       name: z.object({
//         firstName: z.string({
//           required_error: 'first name is required',
//         }),
//         middleName: z.string().optional(),
//         lastName: z.string({
//           required_error: 'last name is required',
//         }),
//       }),
//       gender: z.enum([...gender] as [string, ...string[]], {
//         required_error: 'gender is required',
//       }),
//       dateOfBirth: z.string({
//         required_error: 'date of birth is required',
//       }),
//       email: z
//         .string({
//           required_error: 'email is required',
//         })
//         .email(),
//       contactNo: z.string({
//         required_error: 'contact no is required',
//       }),
//       emergencyContactNo: z.string({
//         required_error: 'emergency contact no is required',
//       }),
//       bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
//       presentAddress: z.string({
//         required_error: 'present address is required',
//       }),
//       permanentAddress: z.string({
//         required_error: 'permanent address is required',
//       }),
//       academicSemester: z.string({
//         required_error: 'academic semester is required',
//       }),
//       academicFaculty: z.string({
//         required_error: 'academic faculty is required',
//       }),
//       academicDepartment: z.string({
//         required_error: 'academic department is required',
//       }),
//       guardian: z.object({
//         fatherName: z.string({
//           required_error: 'father name is required',
//         }),
//         fatherOccupation: z.string({
//           required_error: 'father occupation is required',
//         }),
//         fatherContactNo: z.string({
//           required_error: 'father contact no is required',
//         }),
//         motherName: z.string({
//           required_error: 'mother name is required',
//         }),
//         motherOccupation: z.string({
//           required_error: 'mother occupation is required',
//         }),
//         motherContactNo: z.string({
//           required_error: 'mother contact no is required',
//         }),
//         address: z.string({
//           required_error: 'address is required',
//         }),
//       }),
//       localGuardian: z.object({
//         name: z.string({
//           required_error: 'local guardian name is required',
//         }),
//         occupation: z.string({
//           required_error: ' local guardian occupation is required',
//         }),
//         contactNo: z.string({
//           required_error: 'local guardian contact no is required',
//         }),
//         address: z.string({
//           required_error: 'local guardian address is required',
//         }),
//       }),
//       profileImage: z.string().optional(),
//     }),
//   }),
// });

export const createTeacherZodSchema = z.object({
  body: z.object({
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

// const TransactionHistorySchema = z.object({
//   date: z.string({
//     required_error: "date is required",
//   }),
//   month: z.enum([...month] as [string, ...string[]], {
//     required_error: "month is required",
//   }),
// });

export const createStudentZodSchema = z.object({
  body: z.object({
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
  }),
});
