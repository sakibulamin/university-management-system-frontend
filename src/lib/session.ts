import { NextResponse } from "next/server";
import { AuthUser } from "@/types";

/**
 * This is OUR OWN cookie name, invented by the frontend for its internal
 * bookkeeping. It is NOT a guess at what the backend calls its cookie —
 * we never assume that name anywhere in this file. Its value is an opaque
 * pack of whatever name/value pair the backend's own Set-Cookie header
 * actually contained the last time we saw one (see packBackendCookie).
 */
export const SESSION_COOKIE_NAME = "ums_rt";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ---------------------------------------------------------------------
// Packing: store the backend's real cookie name+value, unchanged, inside
// our own cookie, without ever hardcoding what that name is expected to
// be. encodeURIComponent output is cookie-value-safe (no ';', ',', ws).
// ---------------------------------------------------------------------

export function packBackendCookie(name: string, value: string): string {
  return `${encodeURIComponent(name)}:${encodeURIComponent(value)}`;
}

/**
 * BUG FIX (Step 2 verification): rejects anything unsafe to place into a
 * raw `Cookie: name=value` header. `ums_rt` is HttpOnly, but it is still
 * a plain string an attacker could set directly (browser devtools, a
 * raw HTTP client, a proxy) — nothing here cryptographically verifies
 * it came from our own mintSessionCookie(). Without this check, a
 * forged value containing control characters (CR/LF) would previously
 * flow, unvalidated, straight into a server-side fetch() Cookie header.
 * Loosely follows RFC 6265 cookie-octet: no control chars, whitespace,
 * comma, semicolon, quote or backslash.
 */
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
    // decodeURIComponent throws on malformed percent-encoding — a
    // tampered cookie could trigger this; must not crash the caller.
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

/**
 * Parses one raw Set-Cookie header string into { name, value, maxAgeSeconds }.
 * Deliberately name-agnostic — never assumes what the cookie is called.
 *
 * TODO(contract): only reads Max-Age (seconds). Does not handle a
 * backend that uses Expires instead — add if that turns out to be the
 * case once a real Set-Cookie header has been inspected locally.
 */
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

/**
 * Cross-runtime Set-Cookie extraction. `getSetCookie()` is the only
 * reliable way to read MULTIPLE Set-Cookie headers from a fetch Response;
 * `.get("set-cookie")` merges them into one unreliable comma-joined
 * string. NOT verified locally — flagged in the Phase 2 report.
 */
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

/**
 * ASSUMPTION (flagged, not invented as fact): login/verify/google-login
 * set exactly one Set-Cookie, per the Postman descriptions ("sets
 * refreshToken cookie", singular). If the backend ever sets more than
 * one, this takes only the first — revisit if that's wrong.
 */
export function mintSessionCookie(
  response: NextResponse,
  backendResponse: Response,
): boolean {
  const setCookies = extractSetCookies(backendResponse);
  if (setCookies.length === 0) return false;

  const parsed = parseFirstSetCookie(setCookies[0]);
  if (!parsed) return false;

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: packBackendCookie(parsed.name, parsed.value),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // Only set maxAge if the backend's own cookie had one; otherwise
    // leave it a session cookie rather than inventing a lifetime.
    ...(parsed.maxAgeSeconds !== undefined
      ? { maxAge: parsed.maxAgeSeconds }
      : {}),
  });

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
  /** Present only if the refresh call itself rotated the cookie. */
  newPackedCookie?: string;
}

/**
 * Calls backend POST /auth/refresh-token server-side, forwarding the
 * backend's own cookie name/value (never assumed — unpacked from what we
 * stored). TODO(contract): whether the backend rotates the refresh token
 * on every use is unconfirmed; this handles both cases defensively (see
 * newPackedCookie) rather than assuming either way.
 */
export async function refreshBackendSession(
  packedCookie: string,
): Promise<RefreshResult | null> {
  const unpacked = unpackBackendCookie(packedCookie);
  if (!unpacked) return null;

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { Cookie: `${unpacked.name}=${unpacked.value}` },
    });
  } catch {
    return null;
  }

  if (!res.ok) return null;

  let json: { data?: { accessToken?: string } };
  try {
    json = await res.json();
  } catch {
    return null;
  }

  const accessToken = json.data?.accessToken;
  if (!accessToken) return null;

  const setCookies = extractSetCookies(res);
  let newPackedCookie: string | undefined;
  if (setCookies.length > 0) {
    const parsed = parseFirstSetCookie(setCookies[0]);
    if (parsed) newPackedCookie = packBackendCookie(parsed.name, parsed.value);
  }

  return { accessToken, newPackedCookie };
}

/**
 * TODO(contract): GET /auth/me's response shape is unconfirmed beyond
 * `data` existing at all (see types/auth.type.ts AuthUser comment).
 */
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

  if (!res.ok) return null;

  try {
    const json: { data?: AuthUser } = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

interface LoginLikeBody {
  data?: { accessToken?: string };
  [key: string]: unknown;
}

/**
 * Shared by /api/auth/login, /api/auth/verify-email and
 * /api/auth/google-login: forward the body to the given backend path,
 * mint our session cookie from whatever Set-Cookie comes back (if any),
 * and pass the backend's JSON body straight through to the browser
 * unchanged — we never invent or reshape the payload, only add the
 * cookie side-effect.
 */
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

  // Callers pass `backendResponse` back into mintSessionCookie() to read
  // its Set-Cookie header — the body above has already been consumed,
  // but Set-Cookie lives on `.headers`, which is still readable.
  return { status: backendResponse.status, json, backendResponse };
}

export interface Session {
  user: AuthUser;
  accessToken: string;
  /** Set when the refresh rotated the cookie; caller must persist it. */
  rotatedPackedCookie?: string;
}

/**
 * Full server-side verification used by middleware: refresh, then
 * fetch the current user. This is real verification against the
 * backend on every call — not a presence check on our own cookie.
 *
 * Performance note (flagged, not solved here): this means two backend
 * round-trips per protected navigation. Acceptable for a first correct
 * implementation; worth revisiting (e.g. a short-lived signed cache) once
 * the flow is confirmed working end to end.
 */
export async function getSessionFromPackedCookie(
  packedCookie: string | undefined,
): Promise<Session | null> {
  if (!packedCookie) return null;

  const refreshed = await refreshBackendSession(packedCookie);
  if (!refreshed) return null;

  const user = await getCurrentUser(refreshed.accessToken);
  if (!user) return null;

  return {
    user,
    accessToken: refreshed.accessToken,
    rotatedPackedCookie: refreshed.newPackedCookie,
  };
}
