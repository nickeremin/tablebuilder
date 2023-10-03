import { protectedProcedure, router } from "@/server/trpc"
import * as z from "zod"

import { TRecord } from "@/shared/types"
import { createRecord, getRecordById } from "@/app/_actions/record"

export const recordRouter = router({
  // Record mutations
  // Record queries
})
