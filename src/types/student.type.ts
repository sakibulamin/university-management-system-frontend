// Confirmed: there is no student-creation endpoint (students exist only
// via registration). The only confirmed admin-editable field is
// programId — the collection explicitly notes students cannot have
// role/password/email/studentId/status changed this way, and the
// example PATCH body sends nothing beyond programId.
export interface AdminUpdateStudentPayload {
  programId: string;
}

// Confirmed PATCH /students/me body — "STUDENT only. Cannot change
// role/password/email/studentId/programId/status." phone and address
// are the only confirmed self-editable fields.
export interface UpdateMyStudentPayload {
  phone: string;
  address: string;
}
