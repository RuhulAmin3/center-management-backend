export type IExpense = {
  name: string;
  type:
    | "Salary"
    | "Transport"
    | "Maintanance"
    | "Purchase"
    | "Breakfast"
    | "others";
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
  year: string;
  totalAmount: number;
  pay: number;
  due?: number;
  status?: "Paid" | "Due" | "Others";
  teacherId?: string;
  shortDescription?: string;
  date: Date;
};

export type IFilterFields = {
  searchTerm?: string;
  name?: string;
  status?: string;
  totalAmount?: number;
  pay?: number;
  month?: string;
  year?: string;
  teacherId?: string;
};
