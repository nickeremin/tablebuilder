import { protectedProcedure, router } from "@/server/trpc"
import * as z from "zod"

import { getAllTables, getTableById } from "@/app/_actions/table"

export const tableRouter = router({
  // Table mutatuions

  // Table queries
  getAllUserTables: protectedProcedure.query(async ({ ctx }) => {
    return await getAllTables(ctx.auth.userId)
  }),
  getUserTableById: protectedProcedure
    .input(z.object({ tableId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await getTableById(input.tableId, ctx.auth.userId)
    }),
})
