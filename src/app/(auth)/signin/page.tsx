import React from "react"
import { type Metadata } from "next"

import { SignInForm } from "@/features/forms"
import { AuthHeading, CreateAccountLinkForMobiles } from "@/entities/auth"
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
        <AuthHeading className="text-[32px]">
          Войдите в Tablebuilder
        </AuthHeading>
        <SignInForm />
      </div>

      <CreateAccountLinkForMobiles />
    </>
  )
}

export default SignInPage
