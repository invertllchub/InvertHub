import { z } from "zod";

export const EditEmailSchema = z.object({
    newEmail: z.email("Email is required"),
});

export type EditEmailFormFields = z.infer<typeof EditEmailSchema>;
