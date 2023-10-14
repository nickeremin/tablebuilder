import { NextRequest, NextResponse } from "next/server"
import { clerkClient, currentUser } from "@clerk/nextjs"

export async function PATCH(req: NextRequest) {
  const { username } = await req.json()

  try {
    const user = await currentUser()
    if (!user) throw new Error("Пользователь не авторизован.")

    await clerkClient.users.updateUser(user.id, {
      username,
    })

    return NextResponse.json({
      success: true,
      message: "Имя пользователя успешно обновлено.",
    })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({
        success: false,
        message: error.message,
      })
  }
}
