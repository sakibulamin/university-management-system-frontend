import {
  createSemester,
  getSemester,
  getSemesters,
  SemesterListParams,
  updateSemester,
} from "@/api";
import { UpdateSemesterPayload } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const semesterKeys = {
  list: (params: SemesterListParams) => ["semesters", "list", params] as const,
  detail: (id: string) => ["semesters", "detail", id] as const,
};

export function useSemesters(params: SemesterListParams) {
  return useQuery({
    queryKey: semesterKeys.list(params),
    queryFn: () => getSemesters(params),
  });
}

export function useSemester(id: string) {
  return useQuery({
    queryKey: semesterKeys.detail(id),
    queryFn: () => getSemester(id),
    enabled: !!id,
  });
}

export function useCreateSemester() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSemester,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["semesters", "list"] }),
  });
}

export function useUpdateSemester() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateSemesterPayload }) =>
      updateSemester(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["semesters", "list"] }),
  });
}
