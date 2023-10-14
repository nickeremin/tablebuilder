"use server"

import { clerkClient } from "@clerk/nextjs"
import { v4 as uuidv4 } from "uuid"

import { db } from "@/shared/db"
import { notificationPreferences } from "@/shared/db/schema"

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

  // Set default notification preferences in the database
  await db.insert(notificationPreferences).values([
    {
      id: uuidv4(),
      userId,
      type: "web",
    },
    {
      id: uuidv4(),
      userId,
      type: "email",
    },
  ])
}

export async function getNotificationPreferences(userId: string) {}
