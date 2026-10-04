import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  clearSessionCookie,
  unpackBackendCookie,
} from "@/lib/session";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// TODO(contract): the Postman collection's collection-level auth block
// (bearer {{accessToken}}) applies to every request including Logout,
// which suggests the backend may expect Authorization: Bearer on logout
// too, in addition to reading the refresh cookie — unconfirmed. This
// forwards whatever the browser actually sent, rather than assuming
// either way.
export async function POST(request: NextRequest) {
  const packedCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const authorization = request.headers.get("authorization");

  if (packedCookie) {
    const unpacked = unpackBackendCookie(packedCookie);
    if (unpacked) {
      try {
        await fetch(`${BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Cookie: `${unpacked.name}=${unpacked.value}`,
            ...(authorization ? { Authorization: authorization } : {}),
          },
        });
      } catch {
        // Best-effort: even if the backend call fails (network error,
        // already-revoked token), we still clear our own cookie below so
        // the user is logged out on this end regardless.
      }
    }
  }

  const response = NextResponse.json({ data: null });
  clearSessionCookie(response);
  return response;
}
