import mongoose from "mongoose";
import config from "../../../config";
import { IUser } from "./user.interface";
import {
  generateGuardianId,
  generateStudentId,
  generateTeacherId,
} from "./user.utils";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "./user.model";
import { ITeacher } from "../teacher/teacher.interface";
import { Teacher } from "../teacher/teacher.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { Class } from "../class/class.model";
import { IGuardian } from "../guardian/guardian.interface";
import { Guardian } from "../guardian/guardian.model";

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find();
  return result;
};

const getUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ id });
  return result;
};

const createStudent = async (student: IStudent, user: IUser) => {
  const { className: studentClass, classRoll, section } = student || {};

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
    const id = generateStudentId(studentClass, classRoll, section);
    user.id = id;
    student.id = id;
    // new student will be an array;
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "failed to create student");
    }
    user.student = newStudent[0]._id;
    const findClass = await Class.findOne({ className: student.className });
    if (!findClass) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `class ${student.className} does not exist. You have to create this class first then you can add student of this class`
      );
    }

    await Class.findOneAndUpdate(
      {
        className: student.className,
      },
      {
        $addToSet: {
          students: student.id,
        },
      },
      { new: true, session }
    );

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

const createGuardian = async (
  guardian: IGuardian,
  user: IUser
): Promise<IUser | null> => {
  // set teacher password;
  // if (!user?.password) {
  //   user.password = config.teacher_pass as string;
  // }

  // set role
  user.role = "guardian";

  const session = await mongoose.startSession();
  let userAllData = null;
  try {
    session.startTransaction();
    const id = await generateGuardianId();
    user.id = id;
    user.needPasswordChange = false;
    guardian.id = id;
    const newGuardian = await Guardian.create([guardian], { session });
    if (!newGuardian.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "failed to create guardian");
    }
    user.guardian = newGuardian[0]._id;
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
      "guardian"
    );
  }
  return userAllData;
};

export const userService = {
  createStudent,
  createTeacher,
  createGuardian,
  getAllUsers,
  getUser,
};
