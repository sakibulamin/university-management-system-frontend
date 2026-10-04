// Confirmed: instructorId is auto-generated server-side; creating an
// instructor profile attaches it to an EXISTING user account via userId.
// This UI gets that userId from GET /admin/users (filtered to role
// INSTRUCTOR) — it does not invent a way to create a user here.
export interface CreateInstructorPayload {
  userId: string;
  departmentId: string;
  designation: string;
  phone: string;
}

export interface UpdateInstructorPayload {
  departmentId: string;
  designation: string;
  phone: string;
}
