"use client"

import * as React from "react"
import { useClerk } from "@clerk/nextjs"

import { Icons } from "@/shared/components/icons"
import { PageHeading } from "@/shared/components/ui/page-header"
import { type SSOCallbackPageProps } from "@/app/(auth)/sso-callback/page"

function SSOCallback({ searchParams }: SSOCallbackPageProps) {
  const { handleRedirectCallback } = useClerk()

  React.useEffect(() => {
    void handleRedirectCallback(searchParams)
  }, [searchParams, handleRedirectCallback])

  return (
    <div className="flex items-center gap-4">
      <PageHeading size="sm" className="my-8 font-bold">
        Проверка
      </PageHeading>
      <span className="mt-[6px]">
        <Icons.spinner className="h-10 w-10 animate-spin" />
      </span>
    </div>
  )
}

export default SSOCallback
