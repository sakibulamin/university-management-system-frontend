import {
  createDepartment,
  deleteDepartment,
  type DepartmentListParams,
  getDepartment,
  getDepartments,
  updateDepartment,
} from "@/api";
import type { UpdateDepartmentPayload } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const departmentKeys = {
  list: (params: DepartmentListParams) => ["departments", "list", params] as const,
  detail: (id: string) => ["departments", "detail", id] as const,
};

export function useDepartments(params: DepartmentListParams) {
  return useQuery({
    queryKey: departmentKeys.list(params),
    queryFn: () => getDepartments(params),
  });
}

export function useDepartment(id: string) {
  return useQuery({
    queryKey: departmentKeys.detail(id),
    queryFn: () => getDepartment(id),
    enabled: !!id,
  });
}

export function useCreateDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDepartment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["departments", "list"] }),
  });
}

export function useUpdateDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateDepartmentPayload }) =>
      updateDepartment(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["departments", "list"] }),
  });
}

export function useDeleteDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDepartment(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["departments", "list"] }),
  });
}
