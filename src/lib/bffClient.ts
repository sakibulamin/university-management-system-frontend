import { ApiError } from "./api-error";

interface BffClientOptions {
  method?: "GET" | "POST";
  body?: unknown;
  headers?: Record<string, string>;
}

/**
 * Calls our own same-origin /api/auth/* Route Handlers. Separate from
 * apiClient.ts on purpose: these routes are themselves the refresh
 * mechanism, so they must never trigger apiClient's 401-retry logic, and
 * they have no baseURL to set (relative to this app, not the backend).
 */
export async function bffClient<T>(
  url: string,
  options: BffClientOptions = {},
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: options.method ?? "GET",
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ApiError({
      status: 0,
      message: "Network error. Please check your connection and try again.",
    });
  }

  let json: unknown;
  try {
    json = await res.json();
  } catch {
    json = {};
  }

  if (!res.ok) {
    const body = json as { message?: string; errors?: Record<string, string[]> };
    throw new ApiError({
      status: res.status,
      message: body?.message ?? "Something went wrong. Please try again.",
      data: json,
      fieldErrors: body?.errors,
    });
  }

  return json as T;
}
