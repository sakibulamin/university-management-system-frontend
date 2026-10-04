import { NextRequest, NextResponse } from "next/server";
import { mintSessionCookie, proxyLoginLikeRequest } from "@/lib/session";

// TODO(contract): the Postman description for google-login is just
// "Public." — no explicit confirmation it sets a cookie the same way
// login does. Same safe-no-op reasoning as verify-email applies.
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const { status, json, backendResponse } = await proxyLoginLikeRequest(
    "/auth/google-login",
    body,
  );

  const response = NextResponse.json(json, { status });

  if (backendResponse.ok) {
    mintSessionCookie(response, backendResponse);
  }

  return response;
}
