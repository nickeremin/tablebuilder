import React from "react"
import { type Metadata } from "next"
import { ErrorBoundary } from "react-error-boundary"

import { VerifyEmail } from "@/features/forms"
import { env } from "@/shared/components/env.mjs"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Подтверждение",
  description: "Процесс подтверждения аккаунта",
}

function VerificationPage() {
  return (
    <ErrorBoundary fallback={<p>Errror </p>}>
      <VerifyEmail />
    </ErrorBoundary>
  )
}

export default VerificationPage
