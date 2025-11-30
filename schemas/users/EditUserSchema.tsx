import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const EditUserSchema = z.object({
    fullName: z.string().min(3, "Name is required"),
    dateOfBirth: z.string().optional(),
    address: z.string().optional(),
    gender: z
        .enum(["Male", "Female"])
        .refine((val) => !!val, { message: "Gender is required" }),
    jobTitle: z.string().optional(),
    role: z.enum(["Admin", "User"])
        .refine((val) => !!val, { message: "Role is required" }),
    phoneNumber: z
        .string()
        .optional()
        .refine(val => !val || isValidPhoneNumber(val), "Enter a valid phone number"),
    // imageUrl: z
    //     .union([
    //         z.string().optional(), 
    //         z.any().optional(),         
    //     ])
    //     .refine(
    //         (file) => {
    //             if (!file || file === "" || (Array.isArray(file) && file.length === 0)) return true;

    //             const f = Array.isArray(file) ? file[0] : file;
    //             if (f instanceof File) {
    //                 return ["image/jpeg", "image/png", "image/webp"].includes(f.type);
    //             }
    //             return true;
    //         },
    //         { message: "Only JPG, PNG, or WEBP files are allowed" }
    //     )
});

export type EditUserFormFields = z.infer<typeof EditUserSchema>;
