import * as z from "zod"

export const feedbackSchema = z.object({
  description: z.string(),
  emoji: z.enum(["love", "good", "bad", "hate"]),
})
