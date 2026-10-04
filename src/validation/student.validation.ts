import z from "zod";

export const adminUpdateStudentSchema = z.object({
  programId: z.string().min(1, "Please select a program."),
});

// TODO(contract): the example value "+8801XXXXXXXXX" is a placeholder
// pattern, not a real number to validate against — kept lenient for the
// same reason instructor.validation.ts's phone field is lenient (Phase 1
// found a stricter regex actually rejected the collection's own
// examples elsewhere).
export const updateMyStudentSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required.")
    .regex(/^\+?\d{10,13}$/, "Enter a valid phone number."),
  address: z.string().min(1, "Address is required."),
});
