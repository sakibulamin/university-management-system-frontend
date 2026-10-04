import { FetchError, ofetch } from "ofetch";
import { ApiError } from "./api-error";
import { clearAccessToken, getAccessToken, setAccessToken } from "./auth-token-store";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * REVISED from Step 1: `credentials: "include"` removed. Under the BFF
 * architecture the browser never holds a backend cookie to send — every
 * cookie-bearing call (login/verify/google-login/refresh/logout) goes
 * through our own /api/auth/* Route Handlers instead. This client is
 * only ever used for direct, Bearer-authenticated calls to the backend.
 *
 * This does mean every one of those direct calls needs the backend's
 * CORS to allow this frontend's origin — see the Phase 2 report.
 */
const rawClient = ofetch.create({
  baseURL: BASE_URL,
});

/**
 * TODO(contract): assumes an error body of roughly
 * `{ message?: string, errors?: Record<string,string[]> }`. Unconfirmed —
 * no saved error response exists in the Postman collection.
 */
function toApiError(error: unknown): ApiError {
  if (error instanceof FetchError) {
    const status = error.statusCode ?? 0;
    const body = error.data as
      | { message?: string; errors?: Record<string, string[]> }
      | undefined;

    return new ApiError({
      status,
      message: body?.message ?? "Something went wrong. Please try again.",
      data: error.data,
      fieldErrors: body?.errors,
    });
  }

  return new ApiError({
    status: 0,
    message: "Network error. Please check your connection and try again.",
  });
}

let refreshPromise: Promise<string | null> | null = null;

/**
 * REVISED from Step 1: calls OUR OWN /api/auth/refresh (same-origin
 * relative path — plain fetch, not the ofetch instance above, since that
 * instance's baseURL points at the backend, not this app). The browser
 * sends our HttpOnly session cookie automatically because this is a
 * same-origin request; no code here handles that cookie directly.
 */
function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = fetch("/api/auth/refresh", { method: "POST" })
      .then(async (res) => {
        if (!res.ok) return null;
        const json = (await res.json()) as { data?: { accessToken?: string } };
        const token = json.data?.accessToken;
        if (!token) return null;
        setAccessToken(token);
        return token;
      })
      .catch(() => null)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export interface ApiClientOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  query?: Record<string, unknown>;
  headers?: Record<string, string>;
  /**
   * Set on any call that must never trigger a refresh-and-retry loop.
   * Only /auth/me and the general domain endpoints go through this
   * client now — login/register/verify/google-login/refresh/logout all
   * go through /api/auth/* instead — but the guard is kept as a safety
   * net against accidental infinite loops.
   */
  skipAuthRetry?: boolean;
}

export async function apiClient<T>(
  url: string,
  options: ApiClientOptions = {},
): Promise<T> {
  const token = getAccessToken();

  try {
    return await rawClient<T>(url, {
      method: options.method,
      body: options.body,
      query: options.query,
      headers: {
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch (error) {
    const apiError = toApiError(error);

    if (apiError.status === 401 && !options.skipAuthRetry) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        return apiClient<T>(url, { ...options, skipAuthRetry: true });
      }
      clearAccessToken();
    }

    throw apiError;
  }
}

export default apiClient;
