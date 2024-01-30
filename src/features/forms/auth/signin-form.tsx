"use client"

import React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { ContinueAuthWith, OAuthLoading } from "@/entities/auth"
import { ClerkLoaded } from "@/shared/components/clerk"
import { LucideIcon } from "@/shared/components/icons"
import { buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

import { OAuthSignInButtons } from "./oauth"

function SignInForm() {
  const searchParams = useSearchParams()

  return (
    <div className="flex min-h-[320px] w-full max-w-[320px] flex-col">
      <ClerkLoaded fallbackComponent={<OAuthLoading />}>
        <OAuthSignInButtons />

        <ContinueAuthWith />

        <Link
          data-shadcnui-button
          href={{ pathname: "/signin/email", query: searchParams.toString() }}
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "xl",
              className: "w-full gap-2 outline-none",
            })
          )}
        >
          <LucideIcon name="Mail" />
          Продолжить по Почте
        </Link>
      </ClerkLoaded>
    </div>
  )
}

export default SignInForm
