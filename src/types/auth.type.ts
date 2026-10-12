export type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN";

export interface LoginPayload {
  email: string;
  password: string;
}


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


export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
