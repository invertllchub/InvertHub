export type gender = "Male" | "Female";
export type role = "Admin" | "User";


export type User = {
  id: string;
  fullName: string;
  age: number;
  dateOfBirth: string,
  address: string;
  gender: gender;
  phoneNumber: string;
  imageUrl: string;
  role: role;
  jobTitle: string;
  email: string;
  hashPassword: string;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface UserResponse {
  users: User[];
}
