"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { type EmailLinkFactor, type SignInFirstFactor } from "@clerk/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { EnvelopeClosedIcon } from "@radix-ui/react-icons"
import { MoveLeftIcon } from "lucide-react"
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
import { PageHeading } from "@/shared/components/ui/page-header"
import { Spacer } from "@/shared/components/ui/spacer"
import { catchClerkError } from "@/shared/lib/utils"
import { checkEmailSchema } from "@/shared/lib/validations/auth"

type Inputs = z.infer<typeof checkEmailSchema>

function EmailSignInForm() {
  const router = useRouter()
  const { isLoaded, signIn, setActive } = useSignIn()
  const [, setExpired] = React.useState(false)
  const [, setVerified] = React.useState(false)
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()

  // Initializing react-hook-form with zod
  const form = useForm<Inputs>({
    resolver: zodResolver(checkEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  if (!isLoaded) return null

  const { startMagicLinkFlow } = signIn.createMagicLinkFlow()

  async function onSubmit(input: Inputs) {
    if (!signIn) return

    startTransition(async () => {
      try {
        // Start the sign in flow, by collecting
        // the user's email address.
        const { supportedFirstFactors } = await signIn.create({
          identifier: input.email,
        })

        // Filter the returned array to find the 'phone_code' entry
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
        const res = await startMagicLinkFlow({
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
            beforeEmit: () => router.push("/dashboard"),
          })
          return
        }
      } catch (error) {
        setIsVerifying(false)
        catchClerkError(error)
      }
    })
  }

  if (isVerifying) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="flex flex-col">
          <div className="flex flex-col items-center gap-6 pb-24">
            <PageHeading
              className="text-center text-[28px] font-bold leading-[1.1]"
              size="xs"
            >
              Подтверждение Почты
            </PageHeading>
            <p className="text-center text-muted-foreground">
              Держите это окно открытым и в новой вкладке откройте ссылку,
              которую мы только что отправили на{" "}
              <span className="font-medium text-primary">
                {form.getValues("email")}
              </span>
            </p>
            {/* <Button
            onClick={() => {
              setIsVerifying(false)
              cancelMagicLinkFlow()
            }}
            className="auth-btn w-full max-w-[320px]"
          >
            Отменить
          </Button> */}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <Form {...form}>
          <form
            className="flex w-full max-w-[456px] flex-col items-center gap-7"
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            <PageHeading className="text-center font-bold" size="xs">
              Войдите в Tablebuilder
            </PageHeading>
            <div className="flex w-full flex-col items-center">
              <div className="w-full max-w-[320px]">
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            variant="xl"
                            placeholder="Введите почту"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    aria-label="Отправить ссылку для подтверждения электронной почты"
                    disabled={isPending}
                    size="xl"
                  >
                    {isPending && (
                      <Icons.spinner
                        className="mr-2 h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    <EnvelopeClosedIcon
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    Продолжить по Почте
                  </Button>
                </div>
                <Spacer />
                <div className="flex items-center justify-center">
                  <Link
                    aria-label="Вернуться назад для выбора другого варианта входа"
                    href="/signin"
                    className="underline-link flex items-center text-sm text-link"
                  >
                    <MoveLeftIcon className="mr-1 h-4 w-4" aria-hidden="true" />
                    Другие варианты входа
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>

      {/* Create new account link for mobile */}
      <div className="flex h-[100px] items-center justify-center border-t bg-background p-8 lg:border-none">
        <Link
          aria-label="Перейти на страницу регистрации"
          href="/signup"
          className="underline-link whitespace-nowrap text-sm text-link lg:hidden"
        >
          У вас нет учетной записи? Создать аккаунт
        </Link>
      </div>
    </>
  )
}

export default EmailSignInForm
