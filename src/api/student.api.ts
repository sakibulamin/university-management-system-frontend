import apiClient from "@/lib/apiClient";
import type {
  AdminUpdateStudentPayload,
  ApiEnvelope,
  ApiPaginatedEnvelope,
  UpdateMyStudentPayload,
} from "@/types";

export interface StudentListParams {
  page?: number;
  limit?: number;
  search?: string;
  programId?: string;
}


export function getStudents(params: StudentListParams) {
  return apiClient<ApiPaginatedEnvelope<Record<string, unknown>>>("/students", {
    query: params,
  });
}


export function getMyStudent() {
  return apiClient<ApiEnvelope<Record<string, unknown>>>("/students/me");
}


export function updateMyStudent(payload: UpdateMyStudentPayload) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>("/students/me", {
    method: "PATCH",
    body: payload,
  });
}

export function getStudent(id: string) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(`/students/${id}`);
}


export function adminUpdateStudent(
  id: string,
  payload: AdminUpdateStudentPayload,
) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(`/students/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

export function deleteStudent(id: string) {
  return apiClient<ApiEnvelope<unknown>>(`/students/${id}`, {
    method: "DELETE",
  });
}
