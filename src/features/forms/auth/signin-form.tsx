"use client"

import * as React from "react"
import Link from "next/link"
import { useSignIn } from "@clerk/nextjs"
import { type OAuthStrategy } from "@clerk/nextjs/server"
import { EnvelopeClosedIcon } from "@radix-ui/react-icons"

import { Icons } from "@/shared/components/icons"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import { PageHeading } from "@/shared/components/ui/page-header"
import { oauthProviders } from "@/shared/config/site/oauth"
import { catchClerkError, cn } from "@/shared/lib/utils"

function SignInForm() {
  const { isLoaded, signIn } = useSignIn()
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null)

  // This function is called when user clicks on the oauth sign in button
  async function oauthSignIn(provider: OAuthStrategy) {
    if (!isLoaded) return null

    try {
      setIsLoading(provider)

      // Try to sign in with oauth provider
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      })
    } catch (error) {
      setIsLoading(null)
      catchClerkError(error)
    }
  }

  return (
    <div className="flex w-full max-w-[456px] flex-col items-center gap-7">
      <PageHeading className="text-center font-bold" size="xs">
        Войдите в Tablebuilder
      </PageHeading>
      <div className="flex w-full flex-col items-center">
        <div className="w-full max-w-[320px]">
          <div className="flex flex-col gap-3">
            {/* OAuth buttons that enable social connections */}
            {oauthProviders.map((provider) => {
              const Icon = Icons[provider.icon]

              return (
                <Button
                  type="button"
                  key={provider.strategy}
                  aria-label={`Войдите с помощью ${provider.name}`}
                  className={cn("text-white", provider.background)}
                  size="xl"
                  onClick={() => oauthSignIn(provider.strategy)}
                  disabled={!!isLoading}
                >
                  {isLoading === provider.strategy ? (
                    <Icons.spinner
                      className="mr-2 h-6 w-6 animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <Icon className="mr-2 h-6 w-6" aria-hidden="true" />
                  )}
                  {provider.label}
                </Button>
              )
            })}
          </div>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                или продолжите
              </span>
            </div>
          </div>

          {/* Link for sign in with email */}
          <Link
            aria-label="Перейти на страницу входа по электронной почте"
            href="/signin/email"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "xl",
                className: "w-full",
              })
            )}
          >
            <EnvelopeClosedIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Продолжить по Почте
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignInForm
