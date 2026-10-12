/** biome-ignore-all lint/suspicious/noControlCharactersInRegex: <explanation> */
import type { NextResponse } from "next/server";
import type { AuthUser } from "@/types";

export const SESSION_COOKIE_NAME = "ums_rt";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export function packBackendCookie(name: string, value: string): string {
  return `${encodeURIComponent(name)}:${encodeURIComponent(value)}`;
}


function isSafeCookieToken(value: string): boolean {
  return /^[^\x00-\x1F\x7F;,\s"\\]*$/.test(value);
}

export function unpackBackendCookie(
  packed: string,
): { name: string; value: string } | null {
  const idx = packed.indexOf(":");
  if (idx === -1) return null;

  let name: string;
  let value: string;
  try {
  
    name = decodeURIComponent(packed.slice(0, idx));
    value = decodeURIComponent(packed.slice(idx + 1));
  } catch {
    return null;
  }

  if (!name || !isSafeCookieToken(name) || !isSafeCookieToken(value)) {
    return null;
  }

  return { name, value };
}


export function parseFirstSetCookie(
  setCookieHeader: string,
): { name: string; value: string; maxAgeSeconds?: number } | null {
  const parts = setCookieHeader.split(";").map((p) => p.trim());
  const nameValue = parts[0];
  const eq = nameValue.indexOf("=");
  if (eq === -1) return null;

  const name = nameValue.slice(0, eq);
  const value = nameValue.slice(eq + 1);

  let maxAgeSeconds: number | undefined;
  for (const attr of parts.slice(1)) {
    const [key, val] = attr.split("=");
    if (key?.toLowerCase() === "max-age" && val) {
      const parsed = Number(val);
      if (!Number.isNaN(parsed)) maxAgeSeconds = parsed;
    }
  }

  return { name, value, maxAgeSeconds };
}


export function extractSetCookies(response: Response): string[] {
  const headers = response.headers as Headers & {
    getSetCookie?: () => string[];
  };

  if (typeof headers.getSetCookie === "function") {
    return headers.getSetCookie();
  }

  const single = response.headers.get("set-cookie");
  return single ? [single] : [];
}

export function mintSessionCookie(
  response: NextResponse,
  backendResponse: Response,
): boolean {
  const setCookies = extractSetCookies(backendResponse);

  if (setCookies.length === 0) {
    console.info("[auth-session] No Set-Cookie headers found");
    return false;
  }

  const parsedCookies = setCookies
    .map(parseFirstSetCookie)
    .filter(
      (cookie): cookie is NonNullable<typeof cookie> =>
        Boolean(cookie),
    );

  const refreshCookie = parsedCookies.find(
    (cookie) => cookie.name === "refreshToken",
  );

  if (!refreshCookie) {
    console.info(
      "[auth-session] refreshToken cookie not found in login response",
    );
    return false;
  }

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: packBackendCookie(
      refreshCookie.name,
      refreshCookie.value,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    ...(refreshCookie.maxAgeSeconds !== undefined
      ? { maxAge: refreshCookie.maxAgeSeconds }
      : {}),
  });

  console.info("[auth-session] Session cookie created:", true);

  return true;
}


export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

interface RefreshResult {
  accessToken: string;
  newPackedCookie?: string;
}



interface LoginLikeBody {
  data?: { accessToken?: string };
  [key: string]: unknown;
}

export async function proxyLoginLikeRequest(
  backendPath: string,
  body: unknown,
): Promise<{ status: number; json: LoginLikeBody; backendResponse: Response }> {
  const backendResponse = await fetch(`${BASE_URL}${backendPath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let json: LoginLikeBody;
  try {
    json = await backendResponse.json();
  } catch {
    json = {};
  }

  return { status: backendResponse.status, json, backendResponse };
}

export interface Session {
  user: AuthUser;
  accessToken: string;

  rotatedPackedCookie?: string;
}


export async function refreshBackendSession(
  packedCookie: string,
): Promise<RefreshResult | null> {
  console.info("[auth-session] backend base URL:", BASE_URL);
  const unpacked = unpackBackendCookie(packedCookie);

  console.info(
    "[auth-session] refresh cookie unpacked:",
    Boolean(unpacked),
  );

  if (!unpacked) {
    console.info("[auth-session] session failure step: cookie_unpack");
    return null;
  }

  console.info(
    "[auth-session] backend cookie name:",
    unpacked.name,
  );

  try {


    const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        Cookie: `${unpacked.name}=${unpacked.value}`,
      },
      cache: "no-store",
    });



   
if (!res.ok) {
  const errorBody = await res.text();

  console.error("[auth-session] refresh backend failed:", {
    status: res.status,
    statusText: res.statusText,
    body: errorBody,
  });

  return null;
}


    const json: { data?: { accessToken?: string } } = await res.json();
    const accessToken = json.data?.accessToken;

 

    if (!accessToken) {
  
      return null;
    }

    const setCookies = extractSetCookies(res);
    let newPackedCookie: string | undefined;

    const refreshCookie = setCookies
      .map(parseFirstSetCookie)
      .find((cookie) => cookie?.name === "refreshToken");

    if (refreshCookie) {
      newPackedCookie = packBackendCookie(
        refreshCookie.name,
        refreshCookie.value,
      );
    }

    return { accessToken, newPackedCookie };
  } catch (error) {
    console.error("[auth-session] refresh request failed:", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message : "Unknown error",
      cause:
        error instanceof Error && error.cause instanceof Error
          ? {
            name: error.cause.name,
            message: error.cause.message,
          }
          : undefined,
    });

    return null;
  }
}

export async function getCurrentUser(
  accessToken: string,
): Promise<AuthUser | null> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch {
 
    return null;
  }

  if (!res.ok) {
  
    return null;
  }

  try {
    const json: { data?: AuthUser } = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getSessionFromPackedCookie(
  packedCookie: string | undefined,
): Promise<Session | null> {
  if (!packedCookie) {
    console.info("[auth-session] final session null:", true, "failure step: incoming_cookie_missing");
    return null;
  }

  const refreshed = await refreshBackendSession(packedCookie);
  if (!refreshed) {
    console.info("[auth-session] final session null:", true, "failure step: refresh");
    return null;
  }

  const user = await getCurrentUser(refreshed.accessToken);
  if (!user) {
    console.info("[auth-session] final session null:", true, "failure step: auth_me");
    return null;
  }

  console.info("[auth-session] final session null:", false);
  return {
    user,
    accessToken: refreshed.accessToken,
    rotatedPackedCookie: refreshed.newPackedCookie,
  };
}