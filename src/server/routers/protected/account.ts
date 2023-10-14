import { protectedProcedure, router } from "@/server/trpc"
import { clerkClient } from "@clerk/nextjs"

import { updateAccountSchema } from "@/shared/lib/validations/account"

export const accountRouter = router({
  // Account mutations
  updateUsername: protectedProcedure
    .input(updateAccountSchema.pick({ username: true }))
    .mutation(async ({ ctx, input }) => {
      await clerkClient.users.updateUser(ctx.auth.userId, {
        username: input.username,
      })
    }),
  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    await clerkClient.users.deleteUser(ctx.auth.userId)
  }),
  // Account queries
  getUser: protectedProcedure.query(async ({ ctx }) => {
    return await clerkClient.users.getUser(ctx.auth.userId)
  }),
})
