"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
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
import { checkEmailSchema } from "@/shared/lib/validations/auth"

type Inputs = z.infer<typeof checkEmailSchema>

const ResetPasswordForm = () => {
  const router = useRouter()
  const { isLoaded, signIn } = useSignIn()
  const [isPending, startTransition] = useTransition()

  // Initializing react-hook-form with zod
  const form = useForm<Inputs>({
    resolver: zodResolver(checkEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = ({ email }: Inputs) => {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        const firstFactor = await signIn.create({
          strategy: "reset_password_email_code",
          identifier: email,
        })

        if (firstFactor.status === "needs_first_factor") {
          router.push("/signin/reset-password/step2")
          toast.message("Проверьте вашу почту", {
            description: "Мы отправили вам 6-значный код подтверждения.",
          })
        }
      } catch (err) {
        catchClerkError(err)
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
                <Input placeholder="rodneymullen180@gmail.com" {...field} />
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
          <span className="sr-only">Продолжить смену пароля</span>
        </Button>
      </form>
    </Form>
  )
}

export default ResetPasswordForm
