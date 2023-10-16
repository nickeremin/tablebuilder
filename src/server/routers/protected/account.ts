import { protectedProcedure, router } from "@/server/trpc"
import { clerkClient } from "@clerk/nextjs"
import * as z from "zod"

import {
  updateAccountSchema,
  updateNotificationPreferencesSchema,
} from "@/shared/lib/validations/account"

export const accountRouter = router({
  // Account mutations
  updateUsername: protectedProcedure
    .input(updateAccountSchema.pick({ username: true }))
    .mutation(async ({ ctx, input }) => {
      await clerkClient.users.updateUser(ctx.auth.userId, {
        username: input.username,
      })
    }),
  updateNotificationPreferences: protectedProcedure
    .input(
      z.object({
        data: updateNotificationPreferencesSchema.omit({ type: true }),
        type: z.enum(["web", "email"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Retrieve prev metadata so that other fields remain unchanged
      const prevPublicMetadata = (
        await clerkClient.users.getUser(ctx.auth.userId)
      ).publicMetadata

      await clerkClient.users.updateUserMetadata(ctx.auth.userId, {
        publicMetadata: {
          ...prevPublicMetadata,
          notificationPreferences: {
            ...prevPublicMetadata.notificationPreferences,
            [input.type]: input.data,
          },
        },
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
