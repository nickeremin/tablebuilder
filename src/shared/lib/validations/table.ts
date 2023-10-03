import * as z from "zod"

export const tableSchema = z.object({
  name: z
    .string()
    .min(
      2,
      "Слишком короткое название, название таблицы должно содержать миниум 2 символа."
    ),
  description: z.string(),
  columns: z.array(
    z.object({
      name: z.string(),
      type: z.enum(["text", "date", "integer", "decimal"]),
      number: z.number(),
    })
  ),
})
