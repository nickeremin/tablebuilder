import { Metadata } from "next"

import { VerifyEmailForm } from "@/features/forms/auth"
import { env } from "@/shared/components/env.mjs"
import { Shell } from "@/shared/components/shells/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Подтвердите почту",
  description:
    "Подтвердите свой адрес электронной почты, чтобы продолжить регистрацию",
}

function VerifyEmailPage() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Подтвердите почту</CardTitle>
          <CardDescription>
            Подтвердите свой адрес электронной почты, чтобы завершить создание
            учетной записи.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <VerifyEmailForm />
        </CardContent>
      </Card>
    </Shell>
  )
}

export default VerifyEmailPage
