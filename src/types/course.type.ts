export interface CreateCoursePayload {
  name: string;
  code: string;
  credits: number;
  description: string;
  departmentId: string;
}


export interface UpdateCoursePayload {
  name?: string;
  credits?: number;
}

export type CourseSortOrder = "asc" | "desc";
