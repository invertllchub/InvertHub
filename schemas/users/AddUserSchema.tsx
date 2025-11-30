import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const AddUserSchema = z.object({
  fullName: z.string().min(3, "Name is required"),
  email: z.email("Email is required"),
  dateOfBirth: z.string().nonempty("Date Posted is required"),
  address: z.string().optional(),
  gender: z
    .enum(["male", "female"])
    .refine((val) => !!val, { message: "Gender is required" }),
  jobTitle: z.string().optional(),
  role: z.enum(["admin", "user"])
    .refine((val) => !!val, { message: "Role is required" }),
  phoneNumber: z
    .string()
    .optional()
    .refine(val => !val || isValidPhoneNumber(val), "Enter a valid phone number"),
  // imageUrl: z
  //   .any()
  //   .optional()
  //   .refine(
  //     (file) => {
  //       if (!file || (Array.isArray(file) && file.length === 0)) return true;

  //       const f = Array.isArray(file) ? file[0] : file;
  //       if (f instanceof File) {
  //         return ["image/jpeg", "image/png", "image/webp"].includes(f.type);
  //       }
  //       return true;
  //     },
  //     { message: "Only JPG, PNG, or WEBP files are allowed" }
  //   ),
  hashPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long")      
    .max(50, "Password too long")                               
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")   
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")   
    .regex(/\d/, "Password must contain at least one number")                   
    .regex(/[@$!%*?&]/, "Password must contain at least one special character")
});

export type AddUserFormFields = z.infer<typeof AddUserSchema>;
