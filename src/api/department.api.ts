import apiClient from "@/lib/apiClient";
import type {
  ApiEnvelope,
  ApiPaginatedEnvelope,
  CreateDepartmentPayload,
  UpdateDepartmentPayload,
} from "@/types";

export interface DepartmentListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export function getDepartments(params: DepartmentListParams) {
  return apiClient<ApiPaginatedEnvelope<Record<string, unknown>>>(
    "/departments",
    { query: params },
  );
}

export function getDepartment(id: string) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(`/departments/${id}`);
}

export function createDepartment(payload: CreateDepartmentPayload) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>("/departments", {
    method: "POST",
    body: payload,
  });
}

export function updateDepartment(id: string, payload: UpdateDepartmentPayload) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(`/departments/${id}`, {
    method: "PATCH",
    body: payload,
  });
}


export function deleteDepartment(id: string) {
  return apiClient<ApiEnvelope<unknown>>(`/departments/${id}`, {
    method: "DELETE",
  });
}
