type TeacherNameType = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

type EducationalQualificationType = {
  universityName: string;
  subject: string;
  result?: string;
  isGraduate: boolean;
  year?: string;
};

type AttendanceType = {
  date: Date;
  isPresent: boolean;
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
  shortDescription?: string;
};

// teacher transaction history added in expense module
// type TransactionHistoryType = {
//   date: Date;
//   month:
//     | "January"
//     | "February"
//     | "March"
//     | "April"
//     | "May"
//     | "June"
//     | "July"
//     | "August"
//     | "September"
//     | "October"
//     | "November"
//     | "December";
//   total: string;
//   pay: string;
//   due: string;
//   status?: string;
//   shortDescription?: string;
// };

export type ITeacher = {
  id: string;
  name: TeacherNameType;
  gender: "Male" | "Female";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo?: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  educationalQualification: EducationalQualificationType;
  designation: string;
  salary?: string;
  subject: string;
  image: string;
  presentAddress: string;
  permanentAddress?: string;
  shortDescription?: string;
  attendance?: AttendanceType[];
  // transactionHistory?: TransactionHistoryType[];
};

export type ISearchFields = {
  searchTerm?: string;
  id?: string;
  gender?: string;
  email?: string;
  designation?: string;
  subject?: string;
  contactNo?: string;
};
