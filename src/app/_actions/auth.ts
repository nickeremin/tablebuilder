"use server"

import { DeletedObjectJSON, type UserJSON } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

import { db } from "@/shared/db"
import { users } from "@/shared/db/schema"

export async function addUser(user: UserJSON) {
  await db.insert(users).values({
    id: user.id,
    emailAddress:
      user.email_addresses.find((e) => e.id === user.primary_email_address_id)
        ?.email_address || "",
    username: user.username,
    imageUrl: user.image_url,
  })
}

export async function updateUser(user: UserJSON) {
  await db
    .update(users)
    .set({
      emailAddress:
        user.email_addresses.find((e) => e.id === user.primary_email_address_id)
          ?.email_address || "",
      username: user.username,
      imageUrl: user.image_url,
    })
    .where(eq(users.id, user.id))
}

export async function deleteUser(user: DeletedObjectJSON) {
  await db.delete(users).where(eq(users.id, user.id ?? ""))
}
