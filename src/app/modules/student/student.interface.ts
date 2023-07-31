import { Types } from "mongoose";
import { IExam } from "../exam/exam.interface";

type StudentNameType = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

type GuardianType = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

type TransactionHistoryType = {
  date: string;
  month:
    | "January"
    | "February"
    | "March"
    | "April"
    | "May"
    | "June"
    | "July"
    | "August"
    | "September"
    | "October"
    | "November"
    | "December";
  total: string;
  pay: string;
  due: string;
  status?: string;
  shortDescription?: string;
};

type ExamResultSubjects = {
  subjectName: string;
  totalMark: string;
  obtainedMark: string;
};

export type ExamResultType = {
  examName: string;
  className: string;
  subject: ExamResultSubjects[];
  exam: Types.ObjectId | IExam;
};

export type IStudent = {
  id: string;
  name: StudentNameType;
  gender: "Male" | "Female";
  dateOfBirth: string;
  email?: string;
  contactNo: string;
  emergencyContactNo?: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  guardian: GuardianType;
  className: string;
  classRoll: string;
  section: string;
  schoolName: string;
  image?: string;
  presentAddress: string;
  permanentAddress?: string;
  shortDescription?: string;
  transactionHistory?: TransactionHistoryType[];
  examsResult?: ExamResultType[];
};

export type ISearchFields = {
  searchTerm?: string;
  id?: string;
  gender?: string;
  email?: string;
  className?: string;
  classRoll?: string;
  schoolName?: string;
  subject?: string;
  bloodGroup?: string;
  contactNo?: string;
};
