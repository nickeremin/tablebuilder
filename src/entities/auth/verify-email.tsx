import React from "react"

import { PageHeading } from "@/shared/components/ui/page-heading"

interface VerifyEmailProps {
  email?: string
}

function VerifyEmail({ email }: VerifyEmailProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 pb-24">
      <PageHeading className="text-center text-[28px] font-bold" size="xs">
        Подтверждение Почты
      </PageHeading>
      <p className="text-center text-muted-foreground">
        Держите это окно открытым и в новой вкладке откройте ссылку, которую мы
        только что отправили на{" "}
        <span className="font-medium text-primary">{email}</span>
      </p>
    </div>
  )
}

export default VerifyEmail
