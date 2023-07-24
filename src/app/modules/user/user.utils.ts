import { User } from "./user.model";

export const generateStudentId = (
  studentClass: string,
  roll: string,
  section: string
): string => {
  const studentId = `$S${section}-${studentClass}${roll}`;
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

export const generateTeacherId = async (): Promise<string> => {
  const currentId = (await lastTeacherId()) || (0).toString().padStart(5, "0");
  let incrementId = (Number(currentId) + 1).toString().padStart(5, "0");
  incrementId = `T-${incrementId}`;
  return incrementId;
};
