import apiClient from "@/lib/apiClient";
import {
  ApiEnvelope,
  ApiPaginatedEnvelope,
  CreateInstructorPayload,
  UpdateInstructorPayload,
} from "@/types";

export interface InstructorListParams {
  page?: number;
  limit?: number;
  search?: string;
  departmentId?: string;
}

export function getInstructors(params: InstructorListParams) {
  return apiClient<ApiPaginatedEnvelope<Record<string, unknown>>>(
    "/instructors",
    { query: params },
  );
}

export function getInstructor(id: string) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(`/instructors/${id}`);
}

// Confirmed: "INSTRUCTOR only." per the Postman description. This is the
// instructor's own self-service read endpoint — used by the Instructor
// Dashboard (Step 6), never by admin management (Step 5).
export function getMyInstructor() {
  return apiClient<ApiEnvelope<Record<string, unknown>>>("/instructors/me");
}

export function createInstructor(payload: CreateInstructorPayload) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>("/instructors", {
    method: "POST",
    body: payload,
  });
}

export function updateInstructor(id: string, payload: UpdateInstructorPayload) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(`/instructors/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

// Confirmed: blocked server-side if active section assignments exist.
export function deleteInstructor(id: string) {
  return apiClient<ApiEnvelope<unknown>>(`/instructors/${id}`, {
    method: "DELETE",
  });
}
