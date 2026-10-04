import z from "zod";

// TODO(contract): Phase 1 found the original reference project's phone
// regex (expecting exactly 10 digits after "+880") actually rejects the
// Postman collection's own instructor examples ("+880160234567",
// "+880171234567" — 9 digits after 880). Kept deliberately lenient here
// rather than reproducing a regex known to conflict with the backend's
// own examples.
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
