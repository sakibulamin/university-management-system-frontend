import { FetchError, ofetch } from "ofetch";
import { ApiError } from "./api-error";
import { clearAccessToken, getAccessToken, setAccessToken } from "./auth-token-store";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


const rawClient = ofetch.create({
  baseURL: BASE_URL,
});

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

function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "same-origin",
    })
      .then(async (res) => {
        if (!res.ok) {
          console.error("[api-client] refresh failed:", res.status);
          return null;
        }

        const json = (await res.json()) as {
          data?: { accessToken?: string };
        };

        const token = json.data?.accessToken;

        if (!token) return null;

        setAccessToken(token);
        return token;
      })
      .catch((error) => {
        console.error("[api-client] refresh request error:", error);
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

// function refreshAccessToken(): Promise<string | null> {
//   if (!refreshPromise) {
//     refreshPromise = fetch("/api/auth/refresh-token", { method: "POST" })
//       .then(async (res) => {
//         if (!res.ok) return null;
//         const json = (await res.json()) as { data?: { accessToken?: string } };
//         const token = json.data?.accessToken;
//         if (!token) return null;
//         setAccessToken(token);
//         return token;
//       })
//       .catch(() => null)
//       .finally(() => {
//         refreshPromise = null;
//       });
//   }

//   return refreshPromise;
// }

export interface ApiClientOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: object;
  query?: object;
  headers?: Record<string, string>;
  skipAuthRetry?: boolean;
}

// export async function apiClient<T>(
//   url: string,
//   options: ApiClientOptions = {},
// ): Promise<T> {
//   const token = getAccessToken();

//   try {
//     return await rawClient<T>(url, {
//       method: options.method,
//       body: options.body,
//       query: options.query,
//       headers: {
//         ...options.headers,
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//     });
//   } catch (error) {
//     const apiError = toApiError(error);

//     if (apiError.status === 401 && !options.skipAuthRetry) {
//       const newToken = await refreshAccessToken();
//       if (newToken) {
//         return apiClient<T>(url, { ...options, skipAuthRetry: true });
//       }
//       clearAccessToken();
//     }

//     throw apiError;
//   }
// }

export async function apiClient<T>(
  url: string,
  options: ApiClientOptions = {},
): Promise<T> {
  const token = getAccessToken();

  console.info("[api-client] request:", url);
  console.info("[api-client] access token exists:", Boolean(token));

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

    console.info("[api-client] request failed:", {
      url,
      status: apiError.status,
      skipAuthRetry: Boolean(options.skipAuthRetry),
    });

    if (apiError.status === 401 && !options.skipAuthRetry) {
      console.info("[api-client] attempting token refresh");

      const newToken = await refreshAccessToken();

      console.info(
        "[api-client] refresh succeeded:",
        Boolean(newToken),
      );

      if (newToken) {
        return apiClient<T>(url, {
          ...options,
          skipAuthRetry: true,
        });
      }

      clearAccessToken();
    }

    throw apiError;
  }
}

export default apiClient;