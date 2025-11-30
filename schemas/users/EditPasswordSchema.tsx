import { z } from "zod";


export const EditPassSchema = z.object({

newPassword: z
  .string()
  .optional()
  .refine((val) => {
    if (!val) return true; 
    return (
      val.length >= 8 &&
      /[A-Z]/.test(val) &&
      /[a-z]/.test(val) &&
      /\d/.test(val) &&
      /[@$!%*?&]/.test(val)
    );
  }, "Password must be at least 8 characters, contain uppercase, lowercase, number, and special character")

});

export type EditPassFormFields = z.infer<typeof EditPassSchema>;
