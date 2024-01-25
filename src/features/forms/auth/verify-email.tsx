"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { useClerk } from "@clerk/nextjs"

import { LucideIcon } from "@/shared/components/icons"
import { PageHeading } from "@/shared/components/ui/page-heading"
import { useCreateQueryString } from "@/shared/lib/hooks"

type VerificationStatus = "verified" | "failed"

function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = React.useState<
    VerificationStatus | undefined
  >()
  const { handleEmailLinkVerification } = useClerk()

  // Check your search params to navigate to the correct verification completion option
  const searchParams = useSearchParams()
  const createQueryString = useCreateQueryString()
  const email = searchParams.get("email")
  const mode = searchParams.get("mode")

  React.useEffect(() => {
    async function verify() {
      try {
        await handleEmailLinkVerification({
          redirectUrlComplete: `http://localhost:3000/verification/complete?${createQueryString(
            {
              email,
              mode,
            }
          )}`,
        })
        // If we're not redirected at this point, it means
        // that the flow has completed on another device.
        setVerificationStatus("verified")
      } catch (error) {
        // Verification has failed.
        if (error instanceof Error) {
          setVerificationStatus("failed")
        }
      }
    }
    verify()
    //react-hooks/exhaustive-deps
  }, [email, mode])

  if (verificationStatus === "failed") {
    return <VerificationFailed />
  }

  if (verificationStatus === "verified") {
    return <VerificationSucceed />
  }

  return (
    <div className="max-w-[50rem] p-6">
      <div className="flex items-center gap-4">
        <PageHeading size="sm" variant="gradient" className="font-bold">
          Проверка
        </PageHeading>
        <LucideIcon name="Loader" className="size-6 animate-spin sm:size-8" />
      </div>
    </div>
  )
}

function VerificationFailed() {
  return (
    <div className="max-w-[50rem] p-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <PageHeading
          size="sm"
          variant="gradient"
          className="text-center font-bold"
        >
          Подтверждение не Удалось
        </PageHeading>
        <p className="text-secondary">
          Похоже, вы нажали на недействительную ссылку для подтверждения адреса
          электронной почты. Пожалуйста, закройте это окно и повторите попытку
          аутентификации.
        </p>
      </div>
    </div>
  )
}

function VerificationSucceed() {
  return (
    <div className="max-w-[50rem] p-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <PageHeading
          size="sm"
          variant="gradient"
          className="text-center font-bold"
        >
          Подтверждение Успешно
        </PageHeading>
        <p className="text-secondary">Вы можете закрыть это окно.</p>
      </div>
    </div>
  )
}

export default VerifyEmail