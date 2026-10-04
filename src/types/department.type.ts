export interface CreateDepartmentPayload {
  name: string;
  code: string;
}

// Confirmed PATCH example only sends `name` — `code` is not shown as
// editable, so it's not offered in the edit form either.
export interface UpdateDepartmentPayload {
  name: string;
}
