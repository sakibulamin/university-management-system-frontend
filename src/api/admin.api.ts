import apiClient from "@/lib/apiClient";
import { ApiEnvelope, ApiPaginatedEnvelope, UpdateUserRolePayload } from "@/types";

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

// Confirmed: admin cannot change their own role via this endpoint.
export function updateUserRole(id: string, payload: UpdateUserRolePayload) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(
    `/admin/users/${id}/role`,
    { method: "PATCH", body: payload },
  );
}

// Confirmed: no request body. Admin cannot block themselves; revokes
// the user's live refresh tokens server-side.
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

// Confirmed: soft delete, no request body, admin cannot delete themselves.
export function deleteUser(id: string) {
  return apiClient<ApiEnvelope<unknown>>(`/admin/users/${id}`, {
    method: "DELETE",
  });
}

// TODO(contract): response shape is completely unconfirmed — the
// Postman description only says "30s Redis cache", nothing about what
// fields it returns. Typed as an unknown record; the dashboard page
// renders whatever keys actually come back rather than assuming any.
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

// TODO(contract): response shape is completely unconfirmed (no example
// anywhere). Rendered the same generic way as every other list.
export function getAuditLogs(params: AuditLogListParams) {
  return apiClient<ApiPaginatedEnvelope<Record<string, unknown>>>(
    "/admin/audit-logs",
    { query: params },
  );
}
