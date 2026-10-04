import apiClient from "@/lib/apiClient";
import {
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

// TODO(contract): list-item shape is unconfirmed (no saved response
// exists anywhere in the Postman collection). Typed as a generic record
// deliberately — see components/admin/data-table.tsx, which renders
// whatever fields actually come back rather than a hardcoded schema.
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

// Confirmed: blocked server-side if dependent programs/courses/
// instructors exist — this UI does not pre-check that, it just surfaces
// whatever error the backend returns.
export function deleteDepartment(id: string) {
  return apiClient<ApiEnvelope<unknown>>(`/departments/${id}`, {
    method: "DELETE",
  });
}
