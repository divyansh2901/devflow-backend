import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name required"),

  description: z
    .string()
    .optional(),

  techStack: z
    .string()
    .optional(),
});