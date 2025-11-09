import { z } from "zod";

export const EditJobSchema = z.object({
    title: z.string().min(3, "Title is required"),
    location: z.string().min(2, "Location is required"),

    employmentType: z
        .enum(["FullTime", "PartTime", "Contract", "Hybrid"])
        .refine((val) => !!val, { message: "Employment Type is required" }),

    experienceLevel: z
        .enum(["Junior", "Midlevel", "Senior"])
        .refine((val) => !!val, { message: "Experience Level is required" }),

    salary: z.string().min(1, "Salary must be greater than 0"),

    status: z
        .enum(["Available", "NotAvailable"])
        .refine((val) => !!val, { message: "Status is required" }),

    datePosted: z.string().nonempty("Date Posted is required"),
    closingDate: z.string().nonempty("Closing Date is required"),
    description: z.string().min(10, "Description should be at least 10 characters"),
    keyResponsibilities: z.string().min(5, "Please list at least one requirement"),
    requirements: z.string().min(10, "Please list at least one requirement"),
    benefits: z.string().min(5, "Please list at least one benefit"),
});

export type EditJobFormFields = z.infer<typeof EditJobSchema>;
