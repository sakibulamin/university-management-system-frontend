import apiClient from "@/lib/apiClient";
import { getAccessToken } from "@/lib/auth-token-store";
import { bffClient } from "@/lib/bffClient";
import {
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

// Goes through our own BFF route (not the backend directly): the
// backend's response sets a refresh cookie, which must never reach the
// browser. See lib/session.ts and app/api/auth/login/route.ts.
export function userLogin(payload: LoginPayload) {
  return bffClient<ApiEnvelope<TokenPair>>("/api/auth/login", {
    method: "POST",
    body: payload,
  });
}

// TODO(contract): response shape for a successful registration is
// unconfirmed. Register does not set a cookie per the Postman
// description ("account not created until verified"), so this stays a
// direct backend call — no BFF hop needed.
export function userRegistration(payload: RegistrationPayload) {
  return apiClient<ApiEnvelope<unknown>>("/auth/register", {
    method: "POST",
    body: payload,
    skipAuthRetry: true,
  });
}

// BFF route — same reasoning as login: description says this "returns
// tokens", treated the same way as login for cookie purposes.
export function verifyAccount(payload: VerifyAccountPayload) {
  return bffClient<ApiEnvelope<TokenPair>>("/api/auth/verify-email", {
    method: "POST",
    body: payload,
  });
}

// BFF route. Endpoint corrected per the Postman collection:
// POST /auth/google-login, not /auth/google.
export function googleLogin(payload: GoogleLoginPayload) {
  return bffClient<ApiEnvelope<TokenPair>>("/api/auth/google-login", {
    method: "POST",
    body: payload,
  });
}

// Direct backend call: only needs the Bearer token, no cookie involved.
export function getMe() {
  return apiClient<ApiEnvelope<AuthUser>>("/auth/me");
}

// BFF route: forwards both the unpacked session cookie and (if present)
// the caller's current access token, since the collection's default
// auth block applies to Logout too — see app/api/auth/logout/route.ts.
export function userLogout() {
  const token = getAccessToken();
  return bffClient<ApiEnvelope<unknown>>("/api/auth/logout", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

// Direct backend call: public endpoint, no cookie involved.
export function forgotPassword(payload: ForgotPasswordPayload) {
  return apiClient<ApiEnvelope<unknown>>("/auth/forgot-password", {
    method: "POST",
    body: payload,
    skipAuthRetry: true,
  });
}

// Direct backend call: OTP-based reset, public endpoint, no cookie
// involved. Confirmed body: { email, otp, newPassword }.
export function resetPassword(payload: ResetPasswordPayload) {
  return apiClient<ApiEnvelope<unknown>>("/auth/reset-password", {
    method: "POST",
    body: payload,
    skipAuthRetry: true,
  });
}
