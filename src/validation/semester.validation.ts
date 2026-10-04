import z from "zod";

export const createSemesterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().min(1, "End date is required."),
});

export const updateSemesterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  status: z.enum(["UPCOMING", "ACTIVE", "COMPLETED"]),
});
