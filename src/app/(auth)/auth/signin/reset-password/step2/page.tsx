import { Metadata } from "next"

import { ResetPasswordStep2Form } from "@/features/forms/auth"
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
  description: "Введите новый пароль и код подтверждения, чтобы сменить пароль",
}

const ResetPasswordStep2Page = () => {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Сменить пароль</CardTitle>
          <CardDescription>
            Введите новый пароль и код подтверждения, чтобы сменить пароль.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordStep2Form />
        </CardContent>
      </Card>
    </Shell>
  )
}

export default ResetPasswordStep2Page
