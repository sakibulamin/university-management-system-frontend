
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

export function isUnauthorized(error: unknown): error is ApiError {
  return error instanceof ApiError && error.status === 401;
}
