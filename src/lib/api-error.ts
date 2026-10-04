/**
 * Normalized error thrown by apiClient. UI code (toasts, forms) should
 * only ever see this shape, never a raw ofetch FetchError — a FetchError's
 * `.message` includes the HTTP method/URL/status text, not the backend's
 * actual error message, and would leak request internals to the user.
 *
 * TODO(contract): `fieldErrors` assumes a 422 validation-error response
 * looks like `{ message, errors: Record<string, string[]> }`. No saved
 * 422 response exists in the Postman collection to confirm this. Until
 * confirmed, treat `fieldErrors` as best-effort — it will simply be
 * `undefined` if the backend's real shape differs, and form-level errors
 * should not assume it is populated.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly data: unknown;
  readonly fieldErrors?: Record<string, string[]>;

  constructor(params: {
    status: number;
    message: string;
    data?: unknown;
    fieldErrors?: Record<string, string[]>;
  }) {
    super(params.message);
    this.name = "ApiError";
    this.status = params.status;
    this.data = params.data;
    this.fieldErrors = params.fieldErrors;
  }
}

/** True for the specific case apiClient retries once: an expired access token. */
export function isUnauthorized(error: unknown): error is ApiError {
  return error instanceof ApiError && error.status === 401;
}
