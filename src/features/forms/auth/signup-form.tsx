"use client"

import * as React from "react"
import { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEmailLink, useSignUp } from "@clerk/nextjs"
import { type OAuthStrategy } from "@clerk/nextjs/server"
import { zodResolver } from "@hookform/resolvers/zod"
import { MoveLeftIcon } from "lucide-react"
import {
  useForm,
  useFormContext,
  UseFormReturn,
  useFormState,
  useWatch,
} from "react-hook-form"
import * as z from "zod"

import {
  AuthHeading,
  ContinueAuthWith,
  PrivacyAndTermsLinks,
  VerifyEmail,
} from "@/entities/auth"
import { LucideIcon } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { PageHeading } from "@/shared/components/ui/page-heading"
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group"
import { catchClerkError, cn } from "@/shared/lib/utils"
import { createAccountSchema } from "@/shared/lib/validations/auth"

import { OAuthSignUpButtons } from "./oauth"

type Inputs = z.infer<typeof createAccountSchema>

type SignUpStep = "initial" | "oauth" | "email"

type SignUpContextData = {
  step: SignUpStep
  setStep: React.Dispatch<React.SetStateAction<SignUpStep>>
  isPending: boolean
}

const SignUpContext = React.createContext<SignUpContextData>({
  step: "initial",
  setStep: () => {},
  isPending: false,
})

function SignUpForm() {
  const [step, setStep] = React.useState<SignUpStep>("initial")

  const form = useForm<Inputs>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      username: "",
      subscriptionPlan: undefined,
      email: "",
    },
  })

  const router = useRouter()

  const { isLoaded, setActive, signUp } = useSignUp()
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [, setExpired] = React.useState(false)
  const [, setVerified] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()

  if (!isLoaded) return null

  const { startEmailLinkFlow } = signUp.createEmailLinkFlow()

  function emailSignUp(input: Inputs) {
    if (!isLoaded) return null

    setExpired(false)
    setVerified(false)

    startTransition(async () => {
      try {
        // Start the sign up flow, by collecting the user's data
        await signUp.create({
          emailAddress: input.email,
          username: input.username,
          unsafeMetadata: {
            subscriptionPlan: input.subscriptionPlan,
          },
        })

        setIsVerifying(true)

        const su = await startEmailLinkFlow({
          redirectUrl: `http://localhost:3000/verification?email=${input.email}&mode=signup`,
        })

        // Check the verification result.
        const verification = su.verifications.emailAddress

        if (verification.verifiedFromTheSameClient()) {
          setVerified(true)
          // If you're handling the verification result from
          // another route/component, you should return here.
          // See the <MagicLinkVerification/> component as an
          // example below.
          // If you want to complete the flow on this tab,
          // don't return. Check the sign up status instead.
          return
        } else if (verification.status === "expired") {
          setExpired(true)
        }

        if (su.status === "complete") {
          // Sign up is complete, we have a session.
          // Navigate to the after sign up URL.
          setActive({
            session: su.createdSessionId,
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

  if (isVerifying) return <VerifyEmail email={form.getValues("email")} />

  return (
    <SignUpContext.Provider value={{ step, setStep, isPending }}>
      <div className="flex min-h-[85vh] flex-col justify-between px-6">
        <div className="flex flex-col items-center">
          <div className="flex w-full max-w-[456px] flex-col items-center pt-28">
            <Form {...form}>
              <form
                className="w-full"
                onSubmit={form.handleSubmit(emailSignUp)}
              >
                {step === "initial" && <InitialStep />}
                {step === "oauth" && <OAuthStep />}
                {step === "email" && <EmailStep />}
              </form>
            </Form>
          </div>
        </div>

        <PrivacyAndTermsLinks />
      </div>
    </SignUpContext.Provider>
  )
}

type SubscriptionPlan = {
  title: string
  description: string
  value: string
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    title: "Хобби",
    description: "Я работаю над личными проектами.",
    value: "hobby",
  },
  {
    title: "Про",
    description: "Я работаю над коммерческими проектами.",
    value: "pro",
  },
]

function InitialStep() {
  const form = useFormContext<Inputs>()

  const { setStep } = React.useContext(SignUpContext)

  const { username, subscriptionPlan } = useWatch({
    control: form.control,
  })

  const isSubscriptionPlanSelected = !!subscriptionPlan
  const isUsernameValid =
    Number(username?.length) >= 2 && Number(username?.length) <= 32
  const isValid = subscriptionPlan && isUsernameValid

  return (
    <div className="flex flex-col items-center gap-7">
      <AuthHeading>Создайте Аккаунт Tablebuilder</AuthHeading>

      <div className="w-full">
        <FormItem>
          <FormLabel className="text-sm text-tertiary">План подписки</FormLabel>
          <FormField
            control={form.control}
            name="subscriptionPlan"
            render={({ field }) => (
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col gap-3"
                >
                  {subscriptionPlans.map((plan, i) => (
                    <div key={i}>
                      <RadioGroupItem
                        value={plan.value}
                        id={plan.value}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={plan.value}
                        className={cn(
                          "flex items-center justify-between rounded-md p-3 ring-1 transition hover:cursor-pointer hover:bg-muted",
                          field.value === plan.value
                            ? "bg-blue/10 ring-blue/30 hover:bg-blue/10"
                            : "ring-border"
                        )}
                      >
                        <div className="flex flex-col gap-1 text-sm">
                          <p className="font-medium">{plan.title}</p>
                          <p className="text-tertiary">{plan.description}</p>
                        </div>
                        <span
                          className={cn(
                            "flex size-4 items-center justify-center rounded-full ring-1 transition",
                            field.value === plan.value
                              ? "bg-blue ring-blue"
                              : "ring-border"
                          )}
                        >
                          {field.value === plan.value && (
                            <LucideIcon
                              name="Check"
                              strokeWidth={2}
                              className="size-3 text-white"
                            />
                          )}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </FormItem>

        <div className="flex flex-col gap-4 pt-10">
          {isSubscriptionPlanSelected && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-tertiary">
                    Имя пользователя
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      type="text"
                      maxLength={32}
                      className="h-12 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          <Button
            type="button"
            onClick={() => {
              if (isValid) {
                setStep("oauth")
              }
            }}
            disabled={!isValid}
            size="lg"
          >
            Продолжить
          </Button>
        </div>
      </div>
    </div>
  )
}

function OAuthStep() {
  const form = useFormContext<Inputs>()

  const { setStep } = React.useContext(SignUpContext)

  return (
    <div className="flex flex-col items-center gap-7">
      <AuthHeading>Выберите Способ Создать Аккаунт</AuthHeading>

      <div className="flex w-full max-w-[320px] flex-col">
        <OAuthSignUpButtons
          username={form.getValues("username")}
          subscription={form.getValues("subscriptionPlan")}
        />

        <ContinueAuthWith />

        <Button
          variant="outline"
          className="w-full gap-2"
          size="lg"
          onClick={() => {
            setStep("email")
          }}
        >
          <LucideIcon name="Mail" />
          Продолжить по Почте
        </Button>
      </div>
    </div>
  )
}

function EmailStep() {
  const form = useFormContext<Inputs>()

  const { setStep, isPending } = React.useContext(SignUpContext)

  const handleClick = () => {
    setStep("oauth")
    form.resetField("email")
  }

  return (
    <div className="flex flex-col items-center gap-7">
      <AuthHeading>Зарегистрируйтесь в Tablebuilder</AuthHeading>

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

        <div className="mt-6 flex items-center justify-center">
          <span
            onClick={handleClick}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClick()
              }
            }}
            className="underline-link flex cursor-pointer items-center gap-1 text-link"
            role="link"
            tabIndex={0}
          >
            <LucideIcon name="MoveLeft" />
            Другие варианты регистрации
          </span>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
