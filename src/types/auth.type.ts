export type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN";

export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * `role` may be STUDENT, INSTRUCTOR or ADMIN per explicit product
 * decision for the auth-forms step. See auth.validation.ts for the
 * caveat: this is a decision about what the FORM offers, not a
 * confirmation that the backend accepts all three for self-registration
 * (verify-email's own description reads as student-only — unconfirmed
 * either way).
 */
export interface RegistrationPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface VerifyAccountPayload {
  email: string;
  otp: string;
}

/**
 * TODO(contract): `programId` is documented as required only "for a
 * brand-new user" on google-login. Whether that means the frontend must
 * ask the user to pick a program on first Google sign-in (and where, given
 * GET /programs itself requires auth) is unresolved — see the Phase 2
 * report. Do not wire a program-picker into the Google flow until decided.
 */
export interface GoogleLoginPayload {
  idToken: string;
  programId?: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface TokenPair {
  accessToken: string;
}

/**
 * TODO(contract): no saved response exists for GET /auth/me. This is the
 * minimum shape the frontend needs to do role-based routing at all; it is
 * not a confirmed backend contract. Extend/correct once a real response
 * is captured, and remove this comment when that happens.
 */
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
