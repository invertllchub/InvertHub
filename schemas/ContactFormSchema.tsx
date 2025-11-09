import { z } from "zod";

export const ContactFormSchema = z.object({
    name: z
    .string("Name is required" )
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be less than 50 characters"),
    
    email: z
    .email("Please enter a valid email address"),
    
    reachingOut: z
    .string("Please select a reason")
    .min(1, "Please select why you’re reaching out"),
    
    message: z
    .string("Message is required")
    .min(10, "Message must be at least 10 characters long")
    .max(1000, "Message is too long"),
});

export type ContactFormFields = z.infer<typeof ContactFormSchema>;
