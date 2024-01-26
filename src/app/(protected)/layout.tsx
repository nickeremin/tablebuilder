import React from "react"
import { redirect } from "next/navigation"
import { auth, currentUser } from "@clerk/nextjs"

interface ProtectedLayoutProps {
  children: React.ReactNode
}

async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  // const user = await currentUser()

  // console.log(user)

  // if (!user) redirect("/not-auth")

  return <div>{children}</div>
}

export default ProtectedLayout
