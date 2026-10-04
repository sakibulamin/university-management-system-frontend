import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  clearSessionCookie,
  refreshBackendSession,
} from "@/lib/session";

export async function POST(request: NextRequest) {
  const packedCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!packedCookie) {
    return NextResponse.json(
      { message: "No session to refresh." },
      { status: 401 },
    );
  }

  const refreshed = await refreshBackendSession(packedCookie);

  if (!refreshed) {
    const response = NextResponse.json(
      { message: "Session expired. Please log in again." },
      { status: 401 },
    );
    clearSessionCookie(response);
    return response;
  }

  const response = NextResponse.json({
    data: { accessToken: refreshed.accessToken },
  });

  // Only re-mint if the backend actually rotated the cookie on this
  // refresh call — see the TODO(contract) in lib/session.ts.
  if (refreshed.newPackedCookie) {
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: refreshed.newPackedCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  return response;
}
