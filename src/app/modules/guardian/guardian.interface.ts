export type IGuardian = {
  id: string;
  firstName: string;
  lastName: string;
  mykids: string[];
  gender: "Male" | "Female";
  email?: string;
  professions: string;
  contactNo: string;
  emergencyContactNo?: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  image?: string;
  status: "pending" | "approve" | "reject" | "block";
  presentAddress: string;
  permanentAddress?: string;
  shortDescription?: string;
};

export type IFilterAbleFields = {
  searchTerm?: string;
  id?: string;
  gender?: string;
  email?: string;
  professions?: string;
  contactNo?: string;
  firstName?: string;
  lastName?: string;
  presentAddress?: string;
};
