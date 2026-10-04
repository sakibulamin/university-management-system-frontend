export interface CreateProgramPayload {
  name: string;
  code: string;
  departmentId: string;
}

// Confirmed PATCH example only sends `name`.
export interface UpdateProgramPayload {
  name: string;
}
