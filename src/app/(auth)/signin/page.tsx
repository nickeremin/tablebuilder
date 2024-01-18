import { type Metadata } from "next"
import Link from "next/link"

import { SignInForm } from "@/features/forms"
import { env } from "@/shared/components/env.mjs"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Вход",
  description: "Ввойдите в Ваш аккаунт",
}

function SignInPage() {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <SignInForm />
      </div>

      {/* Create new account link for mobile */}
      <div className="flex h-[100px] items-center justify-center border-t bg-background p-8 lg:border-none">
        <Link
          aria-label="Перейти на страницу регистрации"
          href="/signup"
          className="underline-link text-link whitespace-nowrap text-sm lg:hidden"
        >
          У вас нет учетной записи? Создать аккаунт
        </Link>
      </div>
    </>
  )
}

export default SignInPage
