export type SemesterStatus = "UPCOMING" | "ACTIVE" | "COMPLETED";

export interface CreateSemesterPayload {
  name: string;
  startDate: string;
  endDate: string;
}

// Confirmed PATCH is titled "Update Semester Status" and its example
// body sends { name, status } — not startDate/endDate, so those are not
// offered as editable here.
export interface UpdateSemesterPayload {
  name: string;
  status: SemesterStatus;
}
