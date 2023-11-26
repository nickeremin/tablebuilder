import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest) {
  const { userId } = await req.json()

  console.log(userId)

  return NextResponse.json({ userId })
  // try {
  //   await clerkClient.users.deleteUser(userId)
  //   return NextResponse.json({ message: "Пользователь успешно удален." })
  // } catch (error) {
  //   console.log(error)
  //   return NextResponse.json({
  //     error: "Возникла ошибка при удалении пользователя.",
  //   })
  // }
}
