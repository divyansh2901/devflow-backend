import { z } from "zod";

export const createSessionSchema = z.object({
  topicWorked: z
    .string()
    .min(3),

  duration: z
    .number()
    .positive(),

  notes: z
    .string()
    .optional(),

  projectId: z
    .number(),
});