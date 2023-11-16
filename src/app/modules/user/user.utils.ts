import { IStudent } from "../student/student.interface";
import { User } from "./user.model";

export const generateStudentId = (student: IStudent): string => {
  // const randomNumber = Math.floor(Math.random() * 100000).toString();
  const studentId = `S${student.section}${student.classRoll}-${student.className
    .substring(student.className.length - 2)
    .toUpperCase()}${student.admissionYear.substring(
    student.admissionYear.length - 2
  )}`;
  return studentId;
};

const lastTeacherId = async (): Promise<string | undefined> => {
  const lastId = await User.findOne({ role: "teacher" }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastId?.id ? lastId?.id.substring(2) : undefined;
};

const lastGuardianId = async (): Promise<string | undefined> => {
  const lastId = await User.findOne({ role: "guardian" }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastId?.id ? lastId?.id.substring(2) : undefined;
};

export const generateTeacherId = async (): Promise<string> => {
  const currentId = (await lastTeacherId()) || (0).toString().padStart(5, "0");
  let incrementId = (Number(currentId) + 1).toString().padStart(5, "0");
  incrementId = `T-${incrementId}`;
  return incrementId;
};

export const generateGuardianId = async (): Promise<string> => {
  const currentId = (await lastGuardianId()) || (0).toString().padStart(5, "0");
  let incrementId = (Number(currentId) + 1).toString().padStart(5, "0");
  incrementId = `G-${incrementId}`;
  return incrementId;
};
