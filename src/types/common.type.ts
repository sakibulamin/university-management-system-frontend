
export interface ApiEnvelope<T> {
  data: T;
  success?: boolean;
  message?: string;
}

export interface ApiPaginationMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface ApiPaginatedEnvelope<T> extends ApiEnvelope<T[]> {
  meta?: ApiPaginationMeta;
}
