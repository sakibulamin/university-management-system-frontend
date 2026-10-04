import apiClient from "@/lib/apiClient";
import {
  ApiEnvelope,
  ApiPaginatedEnvelope,
  CreateProgramPayload,
  UpdateProgramPayload,
} from "@/types";

export interface ProgramListParams {
  page?: number;
  limit?: number;
  search?: string;
  departmentId?: string;
}

export function getPrograms(params: ProgramListParams) {
  return apiClient<ApiPaginatedEnvelope<Record<string, unknown>>>("/programs", {
    query: params,
  });
}

export function getProgram(id: string) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(`/programs/${id}`);
}

export function createProgram(payload: CreateProgramPayload) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>("/programs", {
    method: "POST",
    body: payload,
  });
}

export function updateProgram(id: string, payload: UpdateProgramPayload) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(`/programs/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

// Confirmed: blocked server-side if active students reference the program.
export function deleteProgram(id: string) {
  return apiClient<ApiEnvelope<unknown>>(`/programs/${id}`, {
    method: "DELETE",
  });
}
