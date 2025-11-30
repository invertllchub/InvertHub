import {z} from 'zod';
import { isValidPhoneNumber } from "react-phone-number-input";

export const JobApplySchema = z.object({
    fullName: z.string(),
    gender: z.string(),
    email: z.email(),
    phoneNumber: z.string().refine((val) => isValidPhoneNumber(val), "Enter a valid phone number"),
    coverLetter: z.string(),
    CV: z
  .any()
  .refine((files) => files.length === 1, "CV is required")
  .refine(
    (files) =>
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(files[0]?.type),
    "Only PDF/DOC/DOCX files are allowed"
  )
})

export type JobApplicationFormFields = z.infer<typeof JobApplySchema>