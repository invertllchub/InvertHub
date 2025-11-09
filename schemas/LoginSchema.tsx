
import {z} from 'zod';

export const LoginSchema = z.object({
    email: z
    .email("Username is required"),
    password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters long")
})

export type LoginFormFields = z.infer<typeof LoginSchema>

