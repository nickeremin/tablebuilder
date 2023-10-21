import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { SignUpForm } from "@/features/forms/auth"
import { env } from "@/shared/components/env.mjs"
import { Shell } from "@/shared/components/shells/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Создать аккаунт",
  description: "Создайте Ваш аккаунт",
}

const SignUpPage = async () => {
  // const user = await currentUser()
  // if (user) redirect("/")

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <SignUpForm />
    </div>
  )
}

export default SignUpPage
