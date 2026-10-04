import z from "zod";

// Login must not re-enforce password-complexity rules: those are
// registration-time policy, and applying them here would reject a
// correct, already-existing password that predates a policy change (or
// simply doesn't match this particular regex), locking the user out for
// no reason the backend itself would agree with.
export const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

const passwordPolicy = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character.");

/**
 * `role` allows STUDENT, INSTRUCTOR and ADMIN per explicit instruction
 * for this step. Note this is a product decision, not a confirmed
 * backend fact: the Phase 1 audit found the verify-email endpoint's own
 * description ("Creates the User + Student") reads as student-only,
 * which is still unconfirmed either way. If the backend rejects
 * self-registration with role=INSTRUCTOR or role=ADMIN, that will surface
 * as a normal backend error on submit — this form does not hide or
 * work around such a rejection.
 */
export const registrationSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long."),
    email: z.email("Please enter a valid email address."),
    password: passwordPolicy,
    confirmPassword: z.string().min(1, "Please confirm your password."),
    role: z.enum(["STUDENT", "INSTRUCTOR", "ADMIN"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const verifyAccountSchema = z.object({
  email: z.email(),
  otp: z.string().length(6, "Enter the 6-digit code."),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

export const resetPasswordSchema = z
  .object({
    email: z.email(),
    otp: z.string().length(6, "Enter the 6-digit code."),
    newPassword: passwordPolicy,
    confirmNewPassword: z.string().min(1, "Please confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match.",
    path: ["confirmNewPassword"],
  });
