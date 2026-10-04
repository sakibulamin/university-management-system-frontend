import z from "zod";

export const createDepartmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  code: z.string().min(1, "Code is required."),
});

export const updateDepartmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
});
