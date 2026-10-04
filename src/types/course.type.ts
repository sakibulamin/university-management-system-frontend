export interface CreateCoursePayload {
  name: string;
  code: string;
  credits: number;
  description: string;
  departmentId: string;
}

// Confirmed PATCH example sends a partial subset (name + credits).
export interface UpdateCoursePayload {
  name?: string;
  credits?: number;
}

// Only sortBy=createdAt / sortOrder confirmed as an example. Courses are
// the ONLY resource in the whole backend contract that support server
// sorting at all (confirmed in the Phase 1 audit) — do not add sorting
// UI to any other resource's list page.
export type CourseSortOrder = "asc" | "desc";
