import { z } from "zod";

export const AddProjectSchema = z.object({
  Name: z.string().min(3, "Name is required"),
  Description: z.string().min(10, "Description is required"),
  ImageUrl: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Please upload a valid image file", 
    })
    .refine(
      (file) =>
        file instanceof File &&
        ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "Only JPG, PNG, or WEBP files are allowed",
      }
    ),
  Link: z
    .string()
    .regex(
      /^https:\/\/([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/,
      "Please enter a valid URL"
    ),
});

export type AddProjectFormFields = z.infer<typeof AddProjectSchema>;
