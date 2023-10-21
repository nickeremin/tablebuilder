import { Metadata } from "next"

import { ResetPasswordForm } from "@/features/forms/auth"
import { env } from "@/shared/components/env.mjs"
import { Shell } from "@/shared/components/shells"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Сменить пароль",
  description: "Введите Ваш электронный адрес, чтобы сбросить пароль",
}

const ResetPasswordPage = () => {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Сменить пароль</CardTitle>
          <CardDescription>
            Введите свой адрес электронной почты, и мы вышлем вам код
            подтверждения.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </Shell>
  )
}

export default ResetPasswordPage
