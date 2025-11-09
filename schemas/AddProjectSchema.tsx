import { z } from "zod";

export const AddProjectSchema = z.object({
    projectName: z.string().min(3, "Name is required"),
    projectDescription: z.string().min(10, "Description is required"),
    pathImg: z
        .instanceof(File)
        .refine(file => ["image/jpeg", "image/png", "image/webp"].includes(file.type), {
            message: "Only JPG, PNG, or WEBP files are allowed",
        })
        .nullable(),
    projectLink: z.string().regex(/^https?:\/\/[^\s$.?#].[^\s]*$/, "Please enter a valid URL")
});

export type AddProjectFormFields = z.infer<typeof AddProjectSchema>;
