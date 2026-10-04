import z from "zod";

export const createProgramSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  code: z.string().min(1, "Code is required."),
  departmentId: z.string().min(1, "Please select a department."),
});

export const updateProgramSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
});
