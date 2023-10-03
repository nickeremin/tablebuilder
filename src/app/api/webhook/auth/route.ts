import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { type WebhookEvent } from "@clerk/nextjs/server"
import { Webhook } from "svix"

import { env } from "@/shared/components/env.mjs"
import { addUser, deleteUser, updateUser } from "@/app/_actions/auth"

export async function handler(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    )
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error occured", {
      status: 400,
    })
  }

  switch (evt.type) {
    case "user.created": {
      await addUser(evt.data)
      break
    }
    case "user.updated": {
      await updateUser(evt.data)
      break
    }
    case "user.deleted": {
      await deleteUser(evt.data)
      break
    }
  }

  return NextResponse.json({ result: "success" })
}

export { handler as GET, handler as POST }
