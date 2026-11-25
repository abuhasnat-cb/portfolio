import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email")
    .max(320),
  company: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(1, "Message is required").max(10_000),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
