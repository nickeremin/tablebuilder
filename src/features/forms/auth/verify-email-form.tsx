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
import { verifyEmailSchema } from "@/shared/lib/validations/auth"

type Inputs = z.infer<typeof verifyEmailSchema>

const VerifyEmailForm = () => {
  const router = useRouter()
  const { isLoaded, signUp, setActive } = useSignUp()
  const [isPending, startTransition] = useTransition()

  // Initializing react-hook-form with zod
  const form = useForm<Inputs>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: "",
    },
  })

  const onSubmit = ({ code }: Inputs) => {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code,
        })

        if (completeSignUp.status !== "complete") {
          /*  investigate the response, to see if there was an error
             or if the user needs to complete more steps.*/
          console.log(JSON.stringify(completeSignUp, null, 2))
        }

        if (completeSignUp.status === "complete") {
          await setActive({ session: completeSignUp.createdSessionId })

          router.push(`${window.location.origin}/`)
          toast.success("Вы успешно зарегистрированы!")
        }
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Код подтверждения</FormLabel>
              <FormControl>
                <Input
                  placeholder="237186"
                  {...field}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim()
                    field.onChange(e)
                  }}
                />
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
          Подтвердить
          <span className="sr-only">Завершить регистрацию</span>
        </Button>
      </form>
    </Form>
  )
}

export default VerifyEmailForm
