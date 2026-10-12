import apiClient from "@/lib/apiClient";
import { getAccessToken } from "@/lib/auth-token-store";
import { bffClient } from "@/lib/bffClient";
import type {
  ApiEnvelope,
  AuthUser,
  ForgotPasswordPayload,
  GoogleLoginPayload,
  LoginPayload,
  RegistrationPayload,
  ResetPasswordPayload,
  TokenPair,
  VerifyAccountPayload,
} from "@/types";

export function userLogin(payload: LoginPayload) {
  return bffClient<ApiEnvelope<TokenPair>>("/api/auth/login", {
    method: "POST",
    body: payload,
  });
}


export function userRegistration(payload: RegistrationPayload) {
  return apiClient<ApiEnvelope<unknown>>("/auth/register", {
    method: "POST",
    body: payload,
    skipAuthRetry: true,
  });
}

export function verifyAccount(payload: VerifyAccountPayload) {
  return bffClient<ApiEnvelope<TokenPair>>("/api/auth/verify-email", {
    method: "POST",
    body: payload,
  });
}



export function googleLogin(payload: GoogleLoginPayload) {
  return bffClient<ApiEnvelope<TokenPair>>("/api/auth/google-login", {
    method: "POST",
    body: payload,
  });
}
export function getMe() {
  return apiClient<ApiEnvelope<AuthUser>>("/auth/me",{});
}

export function userLogout() {
  const token = getAccessToken();
  return bffClient<ApiEnvelope<unknown>>("/api/auth/logout", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export function forgotPassword(payload: ForgotPasswordPayload) {
  return apiClient<ApiEnvelope<unknown>>("/auth/forgot-password", {
    method: "POST",
    body: payload,
    skipAuthRetry: true,
  });
}


export function resetPassword(payload: ResetPasswordPayload) {
  return apiClient<ApiEnvelope<unknown>>("/auth/reset-password", {
    method: "POST",
    body: payload,
    skipAuthRetry: true,
  });
}
