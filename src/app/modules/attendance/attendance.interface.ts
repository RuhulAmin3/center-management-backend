export type presenceType = {
  studentId: string;
  name: string;
  isPresent: boolean;
};

export type IAttendance = {
  className: string;
  date: Date;
  month: string;
  year: string;
  presence: presenceType[];
};

export type IFiltersOptions = {
  searchTerm: string;
  className: string;
  month: string;
  year: string;
  date: string;
  "presence.studentId": string;
};
