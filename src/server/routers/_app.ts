import { router } from "../trpc"
import { accountRouter } from "./protected/account"
import { recordRouter } from "./protected/record"
import { tableRouter } from "./protected/table"

export const appRouter = router({
  account: accountRouter,
  table: tableRouter,
  record: recordRouter,
})

export type AppRouter = typeof appRouter
