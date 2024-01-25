import React from "react"
import { type Metadata } from "next"

import { SignInForm } from "@/features/forms"
import { AuthHeading } from "@/entities/auth"
import CreateAccountLinkForMobiles from "@/entities/auth/create-account-link-for-mobiles"
import { env } from "@/shared/components/env.mjs"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Вход",
  description: "Ввойдите в Ваш аккаунт",
}

function SignInPage() {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-7 p-6">
        <AuthHeading>Войдите в Tablebuilder</AuthHeading>
        <SignInForm />
      </div>

      <CreateAccountLinkForMobiles />
    </>
  )
}

export default SignInPage
