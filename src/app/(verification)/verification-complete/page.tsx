import { type Metadata } from "next"

import { env } from "@/shared/components/env.mjs"
import { PageHeading } from "@/shared/components/ui/page-header"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Подтверждение успешно",
  description: "Вы успешно подтвердили аккаунт",
}

interface VerificationCompletePageProps {
  searchParams: {
    email: string
    mode: string
  }
}

function VerificationCompletePage({
  searchParams: { email, mode },
}: VerificationCompletePageProps) {
  if (mode === "signup") {
    return (
      <div className="max-w-[50rem] p-6 text-center">
        <div className="flex flex-col gap-6">
          <PageHeading size="sm" className="text-center font-bold">
            Регистрация Завершена
          </PageHeading>
          <p className="text-secondary-foreground">
            <span className="font-semibold text-foreground">{email}</span> был
            подтвержден. Вы можете закрыть это окно.
          </p>
        </div>
      </div>
    )
  }

  if (mode === "signin") {
    return (
      <div className="max-w-[50rem] p-6 text-center">
        <div className="flex flex-col gap-6">
          <PageHeading size="sm" className="text-center font-bold">
            Успешный Вход
          </PageHeading>
          <p className="text-muted-foreground">
            Ваш адрес электронной почты был успешно аутентифицирован.
          </p>
          <p className="text-secondary-foreground">
            Вы можете закрыть это окно.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[50rem] p-6 text-center">
      <div className="flex flex-col gap-6">
        <PageHeading size="sm" className="text-center font-bold">
          Подтверждение Успешно
        </PageHeading>
        <p className="text-secondary-foreground">Вы можете закрыть это окно.</p>
      </div>
    </div>
  )
}

export default VerificationCompletePage
