"use client"

import * as React from "react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
import { type OAuthStrategy } from "@clerk/nextjs/server"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, EnvelopeClosedIcon, ValueIcon } from "@radix-ui/react-icons"
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
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { PageHeading } from "@/shared/components/ui/page-header"
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group"
import { Spacer } from "@/shared/components/ui/spacer"
import { oauthProviders } from "@/shared/config/site/oauth"
import { catchClerkError, cn } from "@/shared/lib/utils"
import { authSchema } from "@/shared/lib/validations/auth"

type Inputs = z.infer<typeof authSchema>

const SignUpForm = () => {
  const router = useRouter()
  const [nextStep, setNextStep] = React.useState(false)
  const [emailStep, setEmailStep] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null)
  const [isPending, startTransition] = useTransition()

  const [isVerifying, setIsVerifying] = React.useState(false)
  const [expired, setExpired] = React.useState(false)
  const [verified, setVerified] = React.useState(false)
  const { isLoaded, setActive, signUp } = useSignUp()

  // Initializing react-hook-form with zod
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      subscriptionPlan: undefined,
      email: "",
    },
  })

  if (!isLoaded) return null

  const { startMagicLinkFlow, cancelMagicLinkFlow } =
    signUp.createMagicLinkFlow()

  async function oauthSignUp(provider: OAuthStrategy) {
    if (!isLoaded) return null

    try {
      setIsLoading(provider)

      // Сreate a user with the entered data
      await signUp.create({
        username: form.getValues("username"),
        unsafeMetadata: {
          subscriptionPlan: form.getValues("subscriptionPlan"),
        },
      })

      // Try to sign in with oauth provider
      await signUp.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
        // Use this to avoid overriding the entered username or subscription plan
        continueSignUp: true,
      })
    } catch (error) {
      catchClerkError(error)
    }
  }

  function onSubmit(input: Inputs) {
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

        const su = await startMagicLinkFlow({
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

  if (isVerifying) {
    return (
      <div className="flex flex-col gap-6 pb-24">
        <PageHeading className="text-center" size="sm">
          Подтверждение Почты
        </PageHeading>
        <p className="text-center text-muted-foreground">
          Держите это окно открытым и в новой вкладке откройте ссылку, которую
          мы только что отправили на{" "}
          <span className="font-medium text-primary">
            {form.getValues("email")}
          </span>
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-[456px] flex-col gap-7"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        {nextStep ? (
          emailStep ? (
            // Step for signin up with emal
            <>
              <PageHeading className="text-center" size="lg">
                Зарегистрируйтесь в Tablebuilder
              </PageHeading>
              <div className="flex flex-col items-center">
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
                              placeholder="Введите почту"
                              className="lg-button-size"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      aria-label="Отправить ссылку для подтверждения электронной почты"
                      type="submit"
                      disabled={isPending}
                      size="lg"
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
                      Продолжить по почте
                    </Button>
                  </div>
                  <Spacer />
                  <div className="flex items-center justify-center">
                    <span
                      onClick={() => setEmailStep(false)}
                      className="underline-link flex items-center text-sm text-link hover:cursor-pointer"
                    >
                      <MoveLeftIcon
                        className="mr-1 h-4 w-4"
                        aria-hidden="true"
                      />
                      Другие варианты регистрации
                      <span className="sr-only">
                        Другие варианты регистрации
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Second step where the user sets the registration method
            <>
              <PageHeading className="text-center" size="lg">
                Выберите Способ Создать Аккаунт
              </PageHeading>

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
                          className={cn("text-white", provider.background)}
                          size="lg"
                          onClick={() => oauthSignUp(provider.strategy)}
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

                  {/* Button for sign up with email */}
                  <Button
                    aria-label="Продолжить регистрацию по электронной почте"
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={() => setEmailStep(true)}
                  >
                    <EnvelopeClosedIcon
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    Продолжить по почте
                  </Button>
                </div>
              </div>
            </>
          )
        ) : (
          // First step where user sets subscription plan and username
          <>
            <PageHeading className="text-center" size="lg">
              Создайте Аккаунт Tablebuilder
            </PageHeading>
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
                        <Input className="lg-button-size" {...field} />
                      </FormItem>
                    )}
                  />
                ) : null}
                <Button
                  aria-aria-label="Перейти к следующему шагу"
                  type="button"
                  onClick={() => setNextStep(true)}
                  disabled={
                    !form.getValues("subscriptionPlan") ||
                    !form.getValues("username")
                  }
                  size="lg"
                  className="disabled:bg-muted disabled:text-muted-foreground"
                >
                  {isPending && (
                    <Icons.spinner
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  Продолжить
                </Button>
              </div>
            </div>
          </>
        )}
      </form>
    </Form>
  )
}

export default SignUpForm
