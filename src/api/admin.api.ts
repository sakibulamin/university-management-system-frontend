import apiClient from "@/lib/apiClient";
import type { ApiEnvelope, ApiPaginatedEnvelope, UpdateUserRolePayload } from "@/types";

export interface AdminUserListParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}

export function getUsers(params: AdminUserListParams) {
  return apiClient<ApiPaginatedEnvelope<Record<string, unknown>>>(
    "/admin/users",
    { query: params },
  );
}

export function updateUserRole(id: string, payload: UpdateUserRolePayload) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(
    `/admin/users/${id}/role`,
    { method: "PATCH", body: payload },
  );
}

export function blockUser(id: string) {
  return apiClient<ApiEnvelope<unknown>>(`/admin/users/${id}/block`, {
    method: "PATCH",
  });
}

export function unblockUser(id: string) {
  return apiClient<ApiEnvelope<unknown>>(`/admin/users/${id}/unblock`, {
    method: "PATCH",
  });
}

export function deleteUser(id: string) {
  return apiClient<ApiEnvelope<unknown>>(`/admin/users/${id}`, {
    method: "DELETE",
  });
}

export function getDashboardStats() {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(
    "/admin/dashboard-stats",
  );
}

export interface AuditLogListParams {
  page?: number;
  limit?: number;
  userId?: string;
  entity?: string;
  action?: string;
}

export function getAuditLogs(params: AuditLogListParams) {
  return apiClient<ApiPaginatedEnvelope<Record<string, unknown>>>(
    "/admin/audit-logs",
    { query: params },
  );
}
