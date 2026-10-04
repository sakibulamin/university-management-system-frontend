import apiClient from "@/lib/apiClient";
import {
  ApiEnvelope,
  ApiPaginatedEnvelope,
  CourseSortOrder,
  CreateCoursePayload,
  UpdateCoursePayload,
} from "@/types";

export interface CourseListParams {
  page?: number;
  limit?: number;
  search?: string;
  departmentId?: string;
  sortBy?: string;
  sortOrder?: CourseSortOrder;
}

export function getCourses(params: CourseListParams) {
  return apiClient<ApiPaginatedEnvelope<Record<string, unknown>>>("/courses", {
    query: params,
  });
}

export function getCourse(id: string) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(`/courses/${id}`);
}

export function createCourse(payload: CreateCoursePayload) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>("/courses", {
    method: "POST",
    body: payload,
  });
}

export function updateCourse(id: string, payload: UpdateCoursePayload) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(`/courses/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

// Confirmed: blocked server-side if dependent sections/prerequisites exist.
export function deleteCourse(id: string) {
  return apiClient<ApiEnvelope<unknown>>(`/courses/${id}`, {
    method: "DELETE",
  });
}
