import z from "zod";

export const adminUpdateStudentSchema = z.object({
  programId: z.string().min(1, "Please select a program."),
});


export const updateMyStudentSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required.")
    .regex(/^\+?\d{10,13}$/, "Enter a valid phone number."),
  address: z.string().min(1, "Address is required."),
});
