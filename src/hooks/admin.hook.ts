import {
  AdminUserListParams,
  AuditLogListParams,
  blockUser,
  deleteUser,
  getAuditLogs,
  getDashboardStats,
  getUsers,
  unblockUser,
  updateUserRole,
} from "@/api";
import { UpdateUserRolePayload } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const adminKeys = {
  users: (params: AdminUserListParams) => ["admin", "users", params] as const,
  dashboardStats: ["admin", "dashboard-stats"] as const,
  auditLogs: (params: AuditLogListParams) => ["admin", "audit-logs", params] as const,
};

export function useAdminUsers(params: AdminUserListParams) {
  return useQuery({
    queryKey: adminKeys.users(params),
    queryFn: () => getUsers(params),
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserRolePayload }) =>
      updateUserRole(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }),
  });
}

export function useBlockUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => blockUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }),
  });
}

export function useUnblockUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => unblockUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }),
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: adminKeys.dashboardStats,
    queryFn: getDashboardStats,
  });
}

export function useAuditLogs(params: AuditLogListParams) {
  return useQuery({
    queryKey: adminKeys.auditLogs(params),
    queryFn: () => getAuditLogs(params),
  });
}
