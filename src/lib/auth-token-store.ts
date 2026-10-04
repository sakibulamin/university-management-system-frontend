/**
 * ARCHITECTURE DECISION — access token storage (Step 2 update: the BFF
 * design below is now implemented, see lib/session.ts and
 * app/api/auth/*; this comment records what was decided and why).
 *
 * Backend contract (confirmed from Postman): login/verify/google-login
 * return `accessToken` in the JSON body, and set `refreshToken` only as
 * a cookie on the BACKEND's own domain (not the frontend's).
 *
 * Rejected: localStorage/sessionStorage — readable by any injected script
 * (XSS).
 *
 * Rejected: a frontend cookie holding the raw access token directly.
 * Approved instead: a same-origin BFF (Next.js Route Handlers under
 * app/api/auth/*) that talks to the backend server-side, and re-mints
 * the backend's Set-Cookie as our own first-party, HttpOnly cookie
 * (`ums_rt`, see lib/session.ts) holding the backend's refresh
 * credential — never the access token, and never readable by browser
 * JS. Middleware verifies sessions by calling the backend itself
 * (refresh + /auth/me) through that same cookie server-side, which is
 * what makes middleware-level protection real rather than a presence
 * check on a client-writable flag.
 *
 * The access token itself still lives only here, in memory, in the
 * browser tab. It is lost on a hard refresh; recovery happens via
 * `POST /api/auth/refresh` (our own route, not the backend directly),
 * which the browser calls same-origin and which relies on `ums_rt`
 * being present and still valid against the backend.
 */
let accessToken: string | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

export function clearAccessToken(): void {
  accessToken = null;
}
