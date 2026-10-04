import {
  createCourse,
  CourseListParams,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "@/api";
import { UpdateCoursePayload } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const courseKeys = {
  list: (params: CourseListParams) => ["courses", "list", params] as const,
  detail: (id: string) => ["courses", "detail", id] as const,
};

export function useCourses(params: CourseListParams) {
  return useQuery({
    queryKey: courseKeys.list(params),
    queryFn: () => getCourses(params),
  });
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn: () => getCourse(id),
    enabled: !!id,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses", "list"] }),
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCoursePayload }) =>
      updateCourse(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses", "list"] }),
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCourse(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses", "list"] }),
  });
}
