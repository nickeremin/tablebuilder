"use client"

import * as React from "react"
import { useUser } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

//import { Icons } from "@/shared/components/icons"
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
import { catchError, cn, logAction } from "@/shared/lib/utils"
import { updateAccountSchema } from "@/shared/lib/validations/account"

const emailSchema = updateAccountSchema.pick({ email: true })
type Inputs = z.infer<typeof emailSchema>

interface UpdateEmailFormProps extends React.HTMLAttributes<HTMLDivElement> {
  email: string
}

function UpdateEmailForm({ email, className, ...props }: UpdateEmailFormProps) {
  const { user } = useUser()

  const [isPending, startTransition] = React.useTransition()

  // Initialize react-hook-form with zod and set current user values
  const form = useForm<Inputs>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email,
    },
  })

  function onSubmit(input: Inputs) {
    // Check if user is loaded
    if (!user) return

    startTransition(async () => {
      try {
        // This feature has not yet been implemented
        logAction({
          toastMessasge:
            "Почта не изменена. Данная функция еще разрабатывается.",
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
          <div className="relative border-b border-border p-6">
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
          <CardFooter className="min-h-[56px] flex-col justify-center gap-2 bg-muted/30 py-3 md:flex-row md:justify-between">
            <p className="text-sm text-muted-foreground">
              Мы отправим вам электронное письмо для подтверждения изменения.
            </p>
            <Button>
              {/* {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )} */}
              Сохранить
              <span className="sr-only">Сохранить почту6</span>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default UpdateEmailForm
