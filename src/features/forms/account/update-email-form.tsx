"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Icons } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import { Card, CardFooter, CardTitle } from "@/shared/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { catchError, cn, getUserEmail, logAction } from "@/shared/lib/utils"
import { updateAccountSchema } from "@/shared/lib/validations/account"
import { trpc } from "@/app/_trpc/client"

// Extract email schema from general update account schema
const emailSchema = updateAccountSchema.pick({ email: true })
type Inputs = z.infer<typeof emailSchema>

interface UpdateEmailFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function UpdateEmailForm({ className, ...props }: UpdateEmailFormProps) {
  // Get signed in user
  const { data: user } = trpc.account.getUser.useQuery(void undefined, {
    suspense: true,
  })

  if (!user) return null

  const [isPending, startTransition] = React.useTransition()

  const email = getUserEmail(user)

  // Initialize react-hook-form with zod and set current user values
  const form = useForm<Inputs>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email,
    },
  })

  function onSubmit(input: Inputs) {
    startTransition(async () => {
      try {
        // This feature has not yet been implemented
        logAction({
          toastMessasge: "Почта не изменена. Данная функция еще в разработке.",
          status: "error",
        })
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <Card
      as="section"
      className={cn("rounded-md border-none shadow-card-border", className)}
      {...props}
    >
      <Form {...form}>
        <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
          <div className="relative border-b p-6">
            <CardTitle className="text-xl">Почта</CardTitle>
            <p className="my-3 text-sm/6">
              Пожалуйста, введите адрес электронной почты, который вы хотите
              использовать для входа в Tablebuilder.
            </p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="max-w-[300px] shadow-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <CardFooter className="min-h-[56px] flex-col justify-center gap-3 bg-muted/30 py-6 md:flex-row md:justify-between md:py-3">
            <p className="text-sm text-muted-foreground">
              Мы отправим вам электронное письмо для подтверждения изменения.
            </p>
            <Button disabled={isPending}>
              {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Сохранить
              <span className="sr-only">Отправить подтверждения на почту</span>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default UpdateEmailForm
