import { z } from "zod";

export const EditJobSchema = z.object({
    title: z.string().min(3, "Title is required"),
    location: z.string().min(2, "Location is required"),

    employmentType: z.enum(["FullTime", "PartTime", "Intern", "Hybrid"], {
        message: "Employment Type is required",
    }),

    experienceLevel: z
        .enum(["Junior", "MidLevel", "Senior"], {
        message: "Experience level is required",
    }),

    // status: z
    //     .enum(["Available", "NotAvailable"], {
    //     message: "Status is required",
    // }),

    closingDate: z.string().nonempty("Closing Date is required"),
    description: z.string().min(10, "Description should be at least 10 characters"),
    keyResponsibilities: z.string().min(5, "Please list at least one requirement"),
    requirements: z.string().min(10, "Please list at least one requirement"),
    benefits: z.string().min(5, "Please list at least one benefit"),
});

export type EditJobFormFields = z.infer<typeof EditJobSchema>;
