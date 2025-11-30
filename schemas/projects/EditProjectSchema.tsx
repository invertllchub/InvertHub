import { z } from "zod";

export const EditProjectSchema = z.object({
    Name: z.string().min(3, "Name is required"),
    Description: z.string().min(10, "Description is required"),
    ImageUrl: z
        .instanceof(File) 
        .refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), {
            message: "Only JPG, PNG, or WEBP files are allowed",
        }),
    Link: z
        .string()
        .regex(
            /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/,
            "Please enter a valid URL"
        )
});

export type EditProjectFormFields = z.infer<typeof EditProjectSchema>;
