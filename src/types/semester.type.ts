export type SemesterStatus = "UPCOMING" | "ACTIVE" | "COMPLETED";

export interface CreateSemesterPayload {
  name: string;
  startDate: string;
  endDate: string;
}


export interface UpdateSemesterPayload {
  name: string;
  status: SemesterStatus;
}
