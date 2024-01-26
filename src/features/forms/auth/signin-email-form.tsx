"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { type EmailLinkFactor, type SignInFirstFactor } from "@clerk/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  AuthHeading,
  CreateAccountLinkForMobiles,
  VerifyEmail,
} from "@/entities/auth"
import { LucideIcon } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { catchClerkError } from "@/shared/lib/utils"
import { checkEmailSchema } from "@/shared/lib/validations/auth"

type Inputs = z.infer<typeof checkEmailSchema>

function SignInEmailForm() {
  const router = useRouter()
  const { isLoaded, signIn, setActive } = useSignIn()
  const [, setExpired] = React.useState(false)
  const [, setVerified] = React.useState(false)
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(checkEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  if (!isLoaded) return null

  const { startEmailLinkFlow } = signIn.createEmailLinkFlow()

  async function onSubmit(input: Inputs) {
    if (!signIn) return

    startTransition(async () => {
      try {
        // Start the sign in flow, by collecting
        // the user's email address.
        const { supportedFirstFactors } = await signIn.create({
          identifier: input.email,
        })

        // Filter the returned array to find the 'email_link' entry
        const isEmailLinkFactor = (
          factor: SignInFirstFactor
        ): factor is EmailLinkFactor => {
          return factor.strategy === "email_link"
        }

        const emailLinkFactor = supportedFirstFactors?.find(isEmailLinkFactor)

        if (emailLinkFactor) setIsVerifying(true)

        // Start the magic link flow.
        // Pass your app URL that users will be navigated
        // res will hold the updated sign in object.
        const res = await startEmailLinkFlow({
          /* eslint-disable */
          emailAddressId: emailLinkFactor?.emailAddressId!,
          redirectUrl: `http://localhost:3000/verification?mode=signin`,
        })

        // Check the verification result.
        const verification = res.firstFactorVerification

        if (verification.verifiedFromTheSameClient()) {
          setVerified(true)
          // If you're handling the verification result from
          // another route/component, you should return here.
          // See the <Verification/> component as an
          // example below.
          // If you want to complete the flow on this tab,
          // don't return. Simply check the sign in status.
          return
        } else if (verification.status === "expired") {
          setExpired(true)
        }

        if (res.status === "complete") {
          setActive({
            session: res.createdSessionId,
            beforeEmit: () => router.push("/"),
          })
          return
        }
      } catch (error) {
        setIsVerifying(false)
        catchClerkError(error)
      }
    })
  }

  if (isVerifying) return <VerifyEmail email={form.getValues("email")} />

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="flex w-full max-w-[456px] flex-col items-center">
          <Form {...form}>
            <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col items-center gap-7">
                <AuthHeading>Войдите в Tablebuilder</AuthHeading>

                <div className="flex w-full max-w-[320px] flex-col">
                  <div className="flex flex-col gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              autoFocus
                              type="email"
                              placeholder="Электронная Почта"
                              className="h-12 rounded-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isPending}
                      size="lg"
                      className="gap-2"
                    >
                      {isPending ? (
                        <LucideIcon name="Loader" className="animate-spin" />
                      ) : (
                        <LucideIcon name="Mail" />
                      )}
                      Продолжить по Почте
                    </Button>
                  </div>

                  <div className="mt-6 flex flex-col items-center">
                    <span className="border-b border-b-transparent text-link hover:border-link">
                      <Link
                        href="/signin"
                        className="flex items-center gap-1 text-sm"
                      >
                        <LucideIcon name="MoveLeft" />
                        Другие варианты входа
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {!isVerifying && <CreateAccountLinkForMobiles />}
    </>
  )
}

export default SignInEmailForm
