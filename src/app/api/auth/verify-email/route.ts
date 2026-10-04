import { NextRequest, NextResponse } from "next/server";
import { mintSessionCookie, proxyLoginLikeRequest } from "@/lib/session";

// TODO(contract): the Postman description says verify-email "returns
// tokens" but does not explicitly confirm a Set-Cookie is set the same
// way login's is. mintSessionCookie() is a no-op if no Set-Cookie is
// present, so this is safe either way — it just won't establish a
// session if the backend doesn't actually set one here.
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
    "/auth/verify-email",
    body,
  );

  const response = NextResponse.json(json, { status });

  if (backendResponse.ok) {
    mintSessionCookie(response, backendResponse);
  }

  return response;
}
