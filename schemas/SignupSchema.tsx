import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const SignupSchema = z
    .object({
        firstName: z
        .string("First Name is required" )
        .min(2, "First Name must be at least 2 characters long"),
        lastName: z
        .string("Last Name is required")
        .min(2, "Last Name must be at least 2 characters long"),
        email: z
        .email("Invalid email address"),
        password: z
        .string("Password is required")
        .min(8, "Password must be at least 8 characters long"),
        confirmedPassword: z.string("Please confirm your password"),
        phoneNumber: z.string().refine((val) => isValidPhoneNumber(val), "Enter a valid phone number"),
    })
    .refine((data) => data.password === data.confirmedPassword, {
        message: "Passwords do not match",
        path: ["confirmedPassword"],
    });

export type SignupFormFields = z.infer<typeof SignupSchema>;
