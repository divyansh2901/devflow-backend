import { z } from "zod";

export const createSnippetSchema =
  z.object({
    title: z.string().min(3),

    language: z.string().min(2),

    code: z.string().min(5),

    tags: z.string().optional(),
  });