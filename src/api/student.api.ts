import apiClient from "@/lib/apiClient";
import {
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

// Confirmed ADMIN only.
export function getStudents(params: StudentListParams) {
  return apiClient<ApiPaginatedEnvelope<Record<string, unknown>>>("/students", {
    query: params,
  });
}

// Confirmed "STUDENT only" — the Student Dashboard's own profile view
// (Step 7). Not used by admin management (Step 5).
export function getMyStudent() {
  return apiClient<ApiEnvelope<Record<string, unknown>>>("/students/me");
}

// Confirmed "STUDENT only", body { phone, address } — explicitly cannot
// change role/password/email/studentId/programId/status via this
// endpoint. Not used by admin management (Step 5); see
// adminUpdateStudent below for the admin-only programId update.
export function updateMyStudent(payload: UpdateMyStudentPayload) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>("/students/me", {
    method: "PATCH",
    body: payload,
  });
}

export function getStudent(id: string) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(`/students/${id}`);
}

// Confirmed: the only admin-editable field on a student is programId.
export function adminUpdateStudent(
  id: string,
  payload: AdminUpdateStudentPayload,
) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(`/students/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

// Confirmed: blocked server-side if active enrollments exist.
export function deleteStudent(id: string) {
  return apiClient<ApiEnvelope<unknown>>(`/students/${id}`, {
    method: "DELETE",
  });
}
