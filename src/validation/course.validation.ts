import z from "zod";

export const createCourseSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  code: z.string().min(1, "Code is required."),
  credits: z.number().int().min(1, "Credits must be at least 1."),
  description: z.string().min(1, "Description is required."),
  departmentId: z.string().min(1, "Please select a department."),
});

export const updateCourseSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  credits: z.number().int().min(1, "Credits must be at least 1."),
});