import apiClient from "@/lib/apiClient";
import {
  ApiEnvelope,
  ApiPaginatedEnvelope,
  CreateSemesterPayload,
  UpdateSemesterPayload,
} from "@/types";

export interface SemesterListParams {
  page?: number;
  limit?: number;
  status?: string;
}

export function getSemesters(params: SemesterListParams) {
  return apiClient<ApiPaginatedEnvelope<Record<string, unknown>>>(
    "/semesters",
    { query: params },
  );
}

export function getSemester(id: string) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(`/semesters/${id}`);
}

export function createSemester(payload: CreateSemesterPayload) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>("/semesters", {
    method: "POST",
    body: payload,
  });
}

export function updateSemester(id: string, payload: UpdateSemesterPayload) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(`/semesters/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

// No deleteSemester export: no DELETE /semesters/:id endpoint is
// confirmed anywhere in the Postman collection. Do not add a delete
// button in the UI for this resource.
