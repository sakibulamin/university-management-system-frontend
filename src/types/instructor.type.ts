
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
