import { router } from "../trpc"
import { recordRouter } from "./protected/record"
import { tableRouter } from "./protected/table"

export const appRouter = router({
  record: recordRouter,
  table: tableRouter,
})

export type AppRouter = typeof appRouter
