import {
  adminUpdateStudent,
  deleteStudent,
  getMyStudent,
  getStudent,
  getStudents,
  type StudentListParams,
  updateMyStudent,
} from "@/api";
import type { AdminUpdateStudentPayload, UpdateMyStudentPayload } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const studentKeys = {
  list: (params: StudentListParams) => ["students", "list", params] as const,
  detail: (id: string) => ["students", "detail", id] as const,
  me: ["students", "me"] as const,
};

export function useMyStudent() {
  return useQuery({
    queryKey: studentKeys.me,
    queryFn: getMyStudent,
  });
}

export function useUpdateMyStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateMyStudentPayload) => updateMyStudent(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: studentKeys.me }),
  });
}

export function useStudents(params: StudentListParams) {
  return useQuery({
    queryKey: studentKeys.list(params),
    queryFn: () => getStudents(params),
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: studentKeys.detail(id),
    queryFn: () => getStudent(id),
    enabled: !!id,
  });
}

export function useAdminUpdateStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: AdminUpdateStudentPayload }) =>
      adminUpdateStudent(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students", "list"] }),
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteStudent(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students", "list"] }),
  });
}
