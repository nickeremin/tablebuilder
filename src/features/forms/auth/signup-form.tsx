"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { catchClerkError } from "@/shared/lib/utils"
import { authSchema } from "@/shared/lib/validations/auth"

type Inputs = z.infer<typeof authSchema>

const SignUpForm = () => {
  const router = useRouter()
  const { isLoaded, signUp } = useSignUp()
  const [isPending, startTransition] = useTransition()

  // Initializing react-hook-form with zod
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = ({ email, password }: Inputs) => {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        await signUp.create({
          emailAddress: email,
          password,
        })

        // Send email verification code
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        })

        router.push("/auth/signup/verify-email")
        toast.message("Проверьте вашу почту", {
          description: "Мы отправили вам 6-значный код подтверждения.",
        })
      } catch (error) {
        catchClerkError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Почта</FormLabel>
              <FormControl>
                <Input placeholder="awesomeuser123@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Продолжить
          <span className="sr-only">
            Перейти на страницу подтверждения электронной почты
          </span>
        </Button>
      </form>
    </Form>
  )
}

export default SignUpForm
