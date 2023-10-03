import { Metadata } from "next"
import Link from "next/link"

import { SignInForm } from "@/features/forms/auth"
import { env } from "@/shared/components/env.mjs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Shell } from "@/shared/components/ui/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Войти",
  description: "Ввойдите в Ваш аккаунт",
}

const SignInPage = () => {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Войти</CardTitle>
          <CardDescription>
            Выберите предпочтительный способ входа в систему.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">
              У вас нет учетной записи?
            </span>
            <Link
              aria-label="Зарегистрироваться"
              href="/auth/signup"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Зарегистрироваться
            </Link>
          </div>
          <Link
            aria-label="Reset password"
            href="/auth/signin/reset-password"
            className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
          >
            Сменить пароль
          </Link>
        </CardFooter>
      </Card>
    </Shell>
  )
}

export default SignInPage
