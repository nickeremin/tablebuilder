import { router } from "../trpc"
import { accountRouter } from "./protected/account"
import { recordRouter } from "./protected/record"
import { storageRouter } from "./protected/storage"
import { tableRouter } from "./protected/table"

export const appRouter = router({
  account: accountRouter,
  table: tableRouter,
  record: recordRouter,
  storage: storageRouter,
})

export type AppRouter = typeof appRouter
