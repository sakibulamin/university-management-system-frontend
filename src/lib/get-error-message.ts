import { ApiError } from "./api-error";

const FALLBACK_MESSAGE = "Something went wrong. Please try again.";


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
