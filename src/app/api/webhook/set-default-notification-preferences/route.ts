import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { type WebhookEvent } from "@clerk/nextjs/server"
import { Webhook } from "svix"

import { env } from "@/shared/components/env.mjs"
import { setDefaultNotificationPreferences } from "@/app/_actions/account"

export async function handler(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET =
    env.CLERK_WEBHOOK_SECRET_SET_DEFAULT_NOTIFICATION_PREFERENCES

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
  } catch (error) {
    console.error("Error verifying webhook:", error)
    return NextResponse.json({ success: false }, { status: 400 })
  }

  if (evt.type === "user.created") {
    try {
      await setDefaultNotificationPreferences(evt.data.id)
    } catch (error) {
      console.error("Error setting default notification preferences:", error)
      return NextResponse.json({ success: false }, { status: 500 })
    }
  }

  return NextResponse.json(
    {
      success: true,
      message: "The default notification settings have been successfully set.",
    },
    { status: 200 }
  )
}

export { handler as POST }
