"use client"

import * as React from "react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, ValueIcon } from "@radix-ui/react-icons"
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
import { catchClerkError, cn } from "@/shared/lib/utils"
import { authSchema } from "@/shared/lib/validations/auth"

type Inputs = z.infer<typeof authSchema>

const SignUpForm = () => {
  const router = useRouter()
  const [nextStep, setNextStep] = React.useState(false)
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

  const onSubmit = (input: Inputs) => {
    if (!isLoaded) return

    console.log(input)
    //return

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

        //router.push("/auth/signup/verify-email")
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
        className="flex w-full max-w-[456px] flex-col gap-4 pt-20"
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
                        <Input className="auth-size-style" {...field} />
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
                  className="auth-size-style disabled:bg-muted disabled:text-muted-foreground"
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
          <>
            <Button onClick={() => console.log(form.getValues())}>
              Check input
            </Button>
          </>
        )}
      </form>
    </Form>
  )
}

export default SignUpForm
