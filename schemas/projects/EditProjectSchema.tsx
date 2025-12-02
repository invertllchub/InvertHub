import { z } from "zod";

export const EditProjectSchema = z.object({
    Name: z.string().min(3, "Name must be at least 3 characters long"),
    Description: z.string().min(10, "Description must be at least 10 characters long"),
    ImageUrl: z
        .union([
            z.string().optional(), 
            z.any().optional(),         
        ])
        .refine(
            (file) => {
                if (!file || file === "" || (Array.isArray(file) && file.length === 0)) return true;

                if (typeof file === "string") return true;

                const f = Array.isArray(file) ? file[0] : file;
                return ["image/jpeg", "image/png", "image/webp"].includes(f?.type);
            },
            { message: "Only JPG, PNG, or WEBP files are allowed" }
        ),
    Link: z
        .string()
        .regex(
            /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/,
            "Please enter a valid URL"
        )
});

export type EditProjectFormFields = z.infer<typeof EditProjectSchema>;
