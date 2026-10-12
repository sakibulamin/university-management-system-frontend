import {
  createProgram,
  deleteProgram,
  getProgram,
  getPrograms,
  type ProgramListParams,
  updateProgram,
} from "@/api";
import type { UpdateProgramPayload } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const programKeys = {
  list: (params: ProgramListParams) => ["programs", "list", params] as const,
  detail: (id: string) => ["programs", "detail", id] as const,
};

export function usePrograms(params: ProgramListParams) {
  return useQuery({
    queryKey: programKeys.list(params),
    queryFn: () => getPrograms(params),
  });
}

export function useProgram(id: string) {
  return useQuery({
    queryKey: programKeys.detail(id),
    queryFn: () => getProgram(id),
    enabled: !!id,
  });
}

export function useCreateProgram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProgram,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["programs", "list"] }),
  });
}

export function useUpdateProgram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProgramPayload }) =>
      updateProgram(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["programs", "list"] }),
  });
}

export function useDeleteProgram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProgram(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["programs", "list"] }),
  });
}
