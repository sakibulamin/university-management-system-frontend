/**
 * TODO(contract): No saved example response exists anywhere in the
 * Postman collection for any endpoint. The only confirmed fact about the
 * response envelope comes from the collection's test scripts, which read
 * `response.data.accessToken` on login / verify-email / google-login /
 * refresh-token. That proves a top-level `data` field exists; it proves
 * nothing about `success`, `message`, or anything else.
 *
 * The reference code (auth-guard.tsx, role-guard.tsx, register-form.tsx)
 * assumes `res.success` and `data?.data`, so `success` and `message` are
 * kept here as OPTIONAL so the shape compiles without asserting a fact
 * we have not verified. Do not rely on `success`/`message` being present
 * until a real response has been captured and this comment is removed.
 */
export interface ApiEnvelope<T> {
  data: T;
  success?: boolean;
  message?: string;
}

/**
 * TODO(contract): Pagination metadata shape is unconfirmed. Every list
 * endpoint accepts `page` and `limit` query params (confirmed from the
 * Postman collection), but no response shows what the returned metadata
 * looks like (a `meta` object, `pagination` object, flat fields, etc).
 * Do not consume this type until a real paginated response is captured.
 */
export interface ApiPaginationMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface ApiPaginatedEnvelope<T> extends ApiEnvelope<T[]> {
  meta?: ApiPaginationMeta;
}
