import {
  createInstructor,
  deleteInstructor,
  getInstructor,
  getInstructors,
  getMyInstructor,
  InstructorListParams,
  updateInstructor,
} from "@/api";
import { UpdateInstructorPayload } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const instructorKeys = {
  list: (params: InstructorListParams) => ["instructors", "list", params] as const,
  detail: (id: string) => ["instructors", "detail", id] as const,
  me: ["instructors", "me"] as const,
};

export function useInstructors(params: InstructorListParams) {
  return useQuery({
    queryKey: instructorKeys.list(params),
    queryFn: () => getInstructors(params),
  });
}

export function useInstructor(id: string) {
  return useQuery({
    queryKey: instructorKeys.detail(id),
    queryFn: () => getInstructor(id),
    enabled: !!id,
  });
}

// Confirmed "INSTRUCTOR only" — the Instructor Dashboard's own profile
// view (Step 6). Not used by admin management (Step 5).
export function useMyInstructor() {
  return useQuery({
    queryKey: instructorKeys.me,
    queryFn: getMyInstructor,
  });
}

export function useCreateInstructor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createInstructor,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["instructors", "list"] }),
  });
}

export function useUpdateInstructor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateInstructorPayload }) =>
      updateInstructor(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["instructors", "list"] }),
  });
}

export function useDeleteInstructor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteInstructor(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["instructors", "list"] }),
  });
}
