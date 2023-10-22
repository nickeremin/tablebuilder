"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { type OAuthStrategy } from "@clerk/nextjs/server"
import { zodResolver } from "@hookform/resolvers/zod"
import { EnvelopeClosedIcon } from "@radix-ui/react-icons"
import { MoveRightIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Icons } from "@/shared/components/icons"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Spacer } from "@/shared/components/ui/spacer"
import { catchClerkError, cn } from "@/shared/lib/utils"
import { authSchema } from "@/shared/lib/validations/auth"

type Inputs = z.infer<typeof authSchema>

export const oauthProviders = [
  {
    label: "Продолжить с Google",
    name: "Google",
    strategy: "oauth_google",
    icon: "google",
    background: "bg-[rgb(66,133,244)] hover:bg-[rgba(66,133,244,.85)]",
  },
  {
    label: "Продолжить с GitHub",
    name: "GitHub",
    strategy: "oauth_github",
    icon: "gitHub",
    background: "bg-[rgb(36,41,46)] hover:bg-[rgba(36,41,46,.85)]",
  },
  {
    label: "Продолжить с Discord",
    name: "Discord",
    strategy: "oauth_discord",
    icon: "discord",
    background: "bg-[rgb(114,137,218)] hover:bg-[rgba(114,137,218,.85)]",
  },
] satisfies {
  label: string
  name: string
  icon: keyof typeof Icons
  strategy: OAuthStrategy
  background: string
}[]

function SignInForm() {
  const router = useRouter()
  const { isLoaded, signIn, setActive } = useSignIn()
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null)
  const [isPending, startTransition] = React.useTransition()

  // Initializing react-hook-form with zod
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // This function invokes when user click on the oauth sign in button
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
      catchClerkError(error)
    }
  }

  const onSubmit = ({ email, password }: Inputs) => {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        const result = await signIn.create({
          identifier: email,
          password,
        })

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId })

          router.push(`${window.location.origin}/`)
        } else {
          /*Investigate why the login hasn't completed */
          console.log(result)
        }
      } catch (error) {
        catchClerkError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-[320px] flex-col"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        {/* OAuth buttons */}
        <div className="flex flex-col gap-3">
          {oauthProviders.map((provider) => {
            const Icon = Icons[provider.icon]

            return (
              <Button
                type="button"
                key={provider.strategy}
                aria-label={`Войдите с помощью ${provider.name}`}
                className={cn("auth-btn text-white", provider.background)}
                onClick={() => oauthSignIn(provider.strategy)}
                disabled={isLoading !== null}
              >
                {isLoading === provider.strategy ? (
                  <Icons.spinner
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
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

        <Link
          href="/signin/email"
          className={cn(
            buttonVariants({
              variant: "outline",
              className: "auth-btn",
            })
          )}
        >
          <EnvelopeClosedIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          Продолжить по почте
          <span className="sr-only">Продолжить по электронной почте</span>
        </Link>
      </form>
    </Form>
  )
}

export default SignInForm
