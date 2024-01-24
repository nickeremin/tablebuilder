import React from "react"
import Link from "next/link"

import { ContinueAuthWith } from "@/entities/auth"
import { LucideIcon } from "@/shared/components/icons"
import { buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

import { OAuthSignInButtons } from "./oauth"

function SignInForm() {
  return (
    <div className="flex w-full max-w-[320px] flex-col">
      <OAuthSignInButtons />

      <ContinueAuthWith />

      <Link
        data-shadcnui-button
        href="/signin/email"
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "lg",
            className: "w-full gap-2 outline-none",
          })
        )}
      >
        <LucideIcon name="Mail" />
        Продолжить по Почте
      </Link>
    </div>
  )
}

export default SignInForm
