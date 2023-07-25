import mongoose from "mongoose";
import config from "../../../config";
import { IUser } from "./user.interface";
import { generateStudentId, generateTeacherId } from "./user.utils";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "./user.model";
import { ITeacher } from "../teacher/teacher.interface";
import { Teacher } from "../teacher/teacher.model";

const createStudent = async (student, user: IUser) => {
  const { class: studentClass, roll, section } = student || {};

  // set password
  if (!user?.password) {
    user.password = config.student_pass as string;
  }

  // set role
  user.role = "student";

  // transaction and roll back start from here
  const session = await mongoose.startSession();
  let userAllData = null;
  try {
    session.startTransaction();
    const id = generateStudentId(studentClass, roll, section);
    user.id = id;
    student.id = id;

    // new student will be an array;
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length > 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, "failed to create student");
    }

    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length > 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, "failed to create user");
    }
    userAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
  if (userAllData) {
    userAllData = await User.findOne({ id: userAllData.id }).populate(
      "student"
    );
  }
  return userAllData;
};

const createTeacher = async (
  teacher: ITeacher,
  user: IUser
): Promise<IUser | null> => {
  // set teacher password;
  if (!user?.password) {
    user.password = config.teacher_pass as string;
  }

  // set role
  user.role = "teacher";

  const session = await mongoose.startSession();
  let userAllData = null;
  try {
    session.startTransaction();
    const id = await generateTeacherId();
    user.id = id;
    teacher.id = id;
    const newTeacher = await Teacher.create([teacher], { session });
    if (!newTeacher.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "failed to create Teacher");
    }
    user.teacher = newTeacher[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "failed to create user");
    }
    userAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
  if (userAllData) {
    userAllData = await User.findOne({ id: userAllData.id }).populate(
      "teacher"
    );
  }
  return userAllData;
};

export const userService = {
  createStudent,
  createTeacher,
};