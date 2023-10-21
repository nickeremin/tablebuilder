"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { type OAuthStrategy } from "@clerk/nextjs/server"
import { type EmailCodeFactor, type SignInFirstFactor } from "@clerk/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { EnvelopeClosedIcon } from "@radix-ui/react-icons"
import { MoveLeftIcon, MoveRightIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Icons } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Spacer } from "@/shared/components/ui/spacer"
import { catchClerkError } from "@/shared/lib/utils"
import { checkEmailSchema } from "@/shared/lib/validations/auth"

type Inputs = z.infer<typeof checkEmailSchema>

function EmailSignInForm() {
  const router = useRouter()
  const { isLoaded, signIn, setActive } = useSignIn()
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null)
  const [isPending, startTransition] = React.useTransition()

  // Initializing react-hook-form with zod
  const form = useForm<Inputs>({
    resolver: zodResolver(checkEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = ({ email }: Inputs) => {
    if (!isLoaded || !signIn) return

    startTransition(async () => {
      try {
        // Start sign in process using email
        const { supportedFirstFactors } = await signIn.create({
          identifier: email,
        })

        console.log({ supportedFirstFactors })

        // Filter the returned array to find the 'email_link' entry
        const isEmailLinkFactor = (
          factor: SignInFirstFactor
        ): factor is EmailCodeFactor => {
          return factor.strategy === "email_link"
        }
        const emailLinkFactor = supportedFirstFactors?.find(isEmailLinkFactor)

        console.log({ emailLinkFactor })

        if (emailLinkFactor) {
          // Grab the emailAddressId
          const { emailAddressId } = emailLinkFactor

          console.log({ emailAddressId })

          // Send the OTP code to the user
          await signIn.prepareFirstFactor({
            strategy: "email_link",
            emailAddressId,
            redirectUrl: "/sso-callback",
          })
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
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Введите электронную почту"
                    className="auth-size-style"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} className="auth-size-style">
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            <EnvelopeClosedIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Продолжить по почте
            <span className="sr-only">Продолжить по почте</span>
          </Button>
        </div>
        <Spacer />
        <div className="flex items-center justify-center">
          <Link
            href="/signin"
            className="underline-link flex items-center text-sm text-link"
          >
            <MoveLeftIcon className="mr-1 h-4 w-4" aria-hidden="true" />
            Другие варианты входа
            <span className="sr-only">Другие варианты входа</span>
          </Link>
        </div>
      </form>
    </Form>
  )
}

export default EmailSignInForm
