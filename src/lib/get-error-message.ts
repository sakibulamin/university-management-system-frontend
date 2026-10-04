import { ApiError } from "./api-error";

const FALLBACK_MESSAGE = "Something went wrong. Please try again.";

/**
 * Single place every auth form calls to turn a caught error into text a
 * user can read. ApiError already carries a backend message when one was
 * available (see apiClient.ts / bffClient.ts), falling back to a generic
 * message otherwise — this just adds a final safety net so nothing ever
 * renders "undefined", "[object Object]", or a raw JS error string.
 */
export function getErrorMessage(
  error: unknown,
  fallback: string = FALLBACK_MESSAGE,
): string {
  if (error instanceof ApiError) {
    return error.message?.trim() ? error.message : fallback;
  }

  if (error instanceof Error && error.message?.trim()) {
    return error.message;
  }

  return fallback;
}
