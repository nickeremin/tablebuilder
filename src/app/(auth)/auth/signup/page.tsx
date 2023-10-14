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
  title: "Зарегистрироваться",
  description: "Зарегистрируйте аккаунт",
}

const SignUpPage = async () => {
  const user = await currentUser()
  if (user) redirect("/")

  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Зарегистрироваться</CardTitle>
          <CardDescription>
            Выберите предпочитаемый способ регистрации.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            У вас уже есть аккаунт?{" "}
            <Link
              aria-label="Войти"
              href="/auth/signin"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Войти
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  )
}

export default SignUpPage
