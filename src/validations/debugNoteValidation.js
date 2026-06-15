import { z } from "zod";

export const createDebugNoteSchema =
  z.object({
    title: z.string().min(3),

    issue: z.string().min(5),

    solution: z.string().min(5),

    tags: z.string().optional(),
  });