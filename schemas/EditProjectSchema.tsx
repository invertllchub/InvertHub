import { z } from "zod";

export const EditProjectSchema = z.object({
    projectName: z.string().min(3, "Name is required"),
    projectDescription: z.string().min(10, "Description is required"),
    pathImg: z
        .any() 
        .refine(
            file => !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            { message: "Only JPG, PNG, or WEBP files are allowed" }
        )
        .nullable(),
    projectLink: z.string().regex(/^https?:\/\/[^\s$.?#].[^\s]*$/, "Please enter a valid URL")
});

export type EditProjectFormFields = z.infer<typeof EditProjectSchema>;
