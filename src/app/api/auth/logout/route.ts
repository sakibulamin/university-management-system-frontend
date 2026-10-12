import { type NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  clearSessionCookie,
  unpackBackendCookie,
} from "@/lib/session";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


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
   
      }
    }
  }

  const response = NextResponse.json({ data: null });
  clearSessionCookie(response);
  return response;
}
