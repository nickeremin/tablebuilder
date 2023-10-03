import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"

import { Context } from "./context"

// Initializing tRPC server instance
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

// Middleware for protected procedures
const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({
    ctx: {
      auth: ctx.auth,
    },
  })
})

// Base router and procedure helpers
export const router = t.router

// Public procedure
export const publicProcedure = t.procedure

// Protected procedure
export const protectedProcedure = t.procedure.use(isAuthed)
