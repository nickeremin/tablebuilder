import * as z from "zod"

export const tableRecordSchema = z.object({
  data: z.array(z.union([z.string(), z.number(), z.date(), z.undefined()])),
})
