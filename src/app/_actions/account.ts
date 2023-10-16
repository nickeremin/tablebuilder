"use server"

import { clerkClient } from "@clerk/nextjs"

export async function setDefaultNotificationPreferences(userId: string) {
  // Set default notification preferences in clerk public metadata
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      notificationPreferences: {
        web: {
          tableFailures: true,
          newUpdates: true,
          subscriptionExpiration: true,
          teamTableChanges: true,
          teamJoinRequests: true,
          warnings: true,
        },
        email: {
          tableFailures: true,
          newUpdates: true,
          subscriptionExpiration: true,
          teamTableChanges: true,
          teamJoinRequests: true,
          warnings: true,
        },
      },
    },
  })
}
