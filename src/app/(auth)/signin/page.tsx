import { Metadata } from "next"

import { SignInForm } from "@/features/forms/auth"
import { env } from "@/shared/components/env.mjs"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Войти",
  description: "Ввойдите в Ваш аккаунт",
}

const SignInPage = () => {
  return <SignInForm />
}

export default SignInPage
