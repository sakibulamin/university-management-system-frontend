import z from "zod";

const phoneSchema = z
  .string()
  .min(1, "Phone number is required.")
  .regex(/^\+?\d{10,13}$/, "Enter a valid phone number.");

export const createInstructorSchema = z.object({
  userId: z.string().min(1, "Please select a user."),
  departmentId: z.string().min(1, "Please select a department."),
  designation: z.string().min(2, "Designation is required."),
  phone: phoneSchema,
});

export const updateInstructorSchema = z.object({
  departmentId: z.string().min(1, "Please select a department."),
  designation: z.string().min(2, "Designation is required."),
  phone: phoneSchema,
});
