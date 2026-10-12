import { ApiError } from "./api-error";

interface BffClientOptions {
  method?: "GET" | "POST";
  body?: unknown;
  headers?: Record<string, string>;
}


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
