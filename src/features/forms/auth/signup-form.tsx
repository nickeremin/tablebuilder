"use client"

import * as React from "react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
import { type OAuthStrategy } from "@clerk/nextjs/server"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, EnvelopeClosedIcon, ValueIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Icons } from "@/shared/components/icons"
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
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group"
import { Spacer } from "@/shared/components/ui/spacer"
import { catchClerkError, cn } from "@/shared/lib/utils"
import { authSchema } from "@/shared/lib/validations/auth"

import { oauthProviders } from "./signin-form"

type Inputs = z.infer<typeof authSchema>

const SignUpForm = () => {
  const router = useRouter()
  const [nextStep, setNextStep] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null)
  const { isLoaded, signUp } = useSignUp()
  const [isPending, startTransition] = useTransition()

  // Initializing react-hook-form with zod
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      subscriptionPlan: undefined,
      email: "",
      password: "",
    },
  })

  async function oauthSignUp(provider: OAuthStrategy) {
    if (!isLoaded) return null

    try {
      setIsLoading(provider)

      // Try to sign in with oauth provider
      await signUp.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
        unsafeMetadata: {
          subscriptionPlan: form.getValues("subscriptionPlan"),
        },
      })
    } catch (error) {
      catchClerkError(error)
    }
  }

  const onSubmit = (input: Inputs) => {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        await signUp.create({
          emailAddress: input.email,
          password: input.password,
          username: input.username,
          unsafeMetadata: {
            subscriptionPlan: input.subscriptionPlan,
          },
        })

        // Send email verification code
        await signUp.prepareEmailAddressVerification({
          strategy: "email_link",
          redirectUrl: "/sso-callback",
        })

        toast.message("Проверьте вашу почту", {
          description: "Мы отправили вам ссылку для подтверждения.",
        })
      } catch (error) {
        catchClerkError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-[456px] flex-col pt-16"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        {!nextStep ? (
          <div className="flex flex-col gap-7">
            <h1 className="text-center text-[32px] font-bold sm:text-[40px]">
              Создайте Аккаунт Tablebuilder
            </h1>
            <div>
              <FormItem className="space-y-1">
                <FormLabel className="text-sm text-muted-foreground">
                  План подписки
                </FormLabel>
                <FormField
                  control={form.control}
                  name="subscriptionPlan"
                  render={({ field }) => (
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col gap-4"
                      >
                        <div>
                          <RadioGroupItem
                            value="hobby"
                            id="hobby"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="hobby"
                            className={cn(
                              "flex rounded-md border p-3 transition-colors hover:cursor-pointer hover:bg-accent",
                              field.value === "hobby" &&
                                "border-[rgb(var(--primary-blue))]/30 bg-[rgb(var(--primary-blue))]/5 hover:bg-[rgb(var(--primary-blue))]/10"
                            )}
                          >
                            <div className="flex w-full items-center justify-between">
                              <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium">Хобби</p>
                                <p className="text-sm text-muted-foreground">
                                  Я работаю над личными проектами.
                                </p>
                              </div>
                              <span>
                                {field.value === "hobby" ? (
                                  <CheckIcon className="h-4 w-4 rounded-full bg-[rgb(var(--primary-blue))] text-white" />
                                ) : (
                                  <ValueIcon className="h-4 w-4 text-muted-foreground/50" />
                                )}
                              </span>
                            </div>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="pro"
                            id="pro"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="pro"
                            className={cn(
                              "flex rounded-md border p-3 transition-colors hover:cursor-pointer hover:bg-accent",
                              field.value === "pro" &&
                                "border-[rgb(var(--primary-blue))]/30 bg-[rgb(var(--primary-blue))]/5 hover:bg-[rgb(var(--primary-blue))]/10"
                            )}
                          >
                            <div className="flex w-full items-center justify-between">
                              <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium">Про</p>
                                <p className="text-sm text-muted-foreground">
                                  Я работаю над коммерческими проектами.
                                </p>
                              </div>
                              <span>
                                {field.value === "pro" ? (
                                  <CheckIcon className="h-4 w-4 rounded-full bg-[rgb(var(--primary-blue))] text-white" />
                                ) : (
                                  <ValueIcon className="h-4 w-4 text-muted-foreground/50" />
                                )}
                              </span>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </FormItem>

              <div className="flex flex-col gap-4 pt-8">
                {form.getValues("subscriptionPlan") ? (
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-sm text-muted-foreground">
                          Имя пользователя
                        </FormLabel>
                        <Input className="auth-btn" {...field} />
                      </FormItem>
                    )}
                  />
                ) : null}
                <Button
                  type="button"
                  onClick={() => setNextStep(true)}
                  disabled={
                    !form.getValues("subscriptionPlan") ||
                    !form.getValues("username")
                  }
                  className="auth-btn disabled:bg-muted disabled:text-muted-foreground"
                >
                  {isPending && (
                    <Icons.spinner
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  Продолжить
                  <span className="sr-only">Перейти к следующему шагу</span>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-7">
            <h1 className="text-center text-[32px] font-bold sm:text-[40px]">
              Выберите способ создать аккаунт
            </h1>

            <div className="flex flex-col items-center">
              <div className="w-full max-w-[320px]">
                {/* OAuth buttons to sign up */}
                <div className="flex flex-col gap-3">
                  {oauthProviders.map((provider) => {
                    const Icon = Icons[provider.icon]

                    return (
                      <Button
                        type="button"
                        key={provider.strategy}
                        aria-label={`Создайте аккаунт с помощью ${provider.name}`}
                        className={cn(
                          "auth-btn text-white",
                          provider.background
                        )}
                        onClick={() => oauthSignUp(provider.strategy)}
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

                <Button variant="outline" className="auth-btn w-full">
                  <EnvelopeClosedIcon
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Продолжить по почте
                  <span className="sr-only">
                    Продолжить по электронной почте
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </form>
    </Form>
  )
}

export default SignUpForm
