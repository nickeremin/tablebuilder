"use client"

import * as React from "react"
import { useClerk } from "@clerk/nextjs"

import { Icons } from "@/shared/components/icons"
import { type SSOCallbackPageProps } from "@/app/(auth)/sso-callback/page"

function SSOCallback({ searchParams }: SSOCallbackPageProps) {
  const { handleRedirectCallback } = useClerk()

  React.useEffect(() => {
    void handleRedirectCallback(searchParams)
  }, [searchParams, handleRedirectCallback])

  return (
    <div className="flex items-center gap-4">
      <h1 className="my-8 text-[44px]/normal font-bold tracking-tighter">
        Проверка
      </h1>
      <span className="mt-[6px]">
        <Icons.spinner className="h-10 w-10 animate-spin" />
      </span>
    </div>
  )
}

export default SSOCallback
