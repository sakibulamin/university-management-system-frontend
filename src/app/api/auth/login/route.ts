import { type NextRequest, NextResponse } from "next/server";
import { mintSessionCookie, proxyLoginLikeRequest } from "@/lib/session";

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
    "/auth/login",
    body,
  );

  if (!backendResponse.ok) {
    console.error("[login] Backend error:", JSON.stringify(json, null, 2));
  }

  const response = NextResponse.json(json, { status });

  if (backendResponse.ok) {
    mintSessionCookie(response, backendResponse);
  }

  return response;
}