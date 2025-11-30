import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters long"),
});

export type LoginFormFields = z.infer<typeof LoginSchema>;
