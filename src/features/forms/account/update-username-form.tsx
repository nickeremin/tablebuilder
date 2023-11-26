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
import { catchError, cn, logAction } from "@/shared/lib/utils"
import { updateAccountSchema } from "@/shared/lib/validations/account"
import { trpc } from "@/app/_trpc/client"

// Extract username schema from general update account schema
const usernameSchema = updateAccountSchema.pick({ username: true })
type Inputs = z.infer<typeof usernameSchema>

interface UpdateUsernameFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

function UpdateUsernameForm({ className, ...props }: UpdateUsernameFormProps) {
  // Get signed in user
  const { data: user } = trpc.account.getUser.useQuery(void undefined, {
    suspense: true,
  })

  const utils = trpc.useContext()
  const { mutateAsync: updateUsername } =
    trpc.account.updateUsername.useMutation({
      // Invalidate user in all components wich use it to get fresh state after updating username
      onSuccess: async () => {
        await utils.account.getUser.invalidate()
      },
    })

  const [isPending, startTransition] = React.useTransition()

  // Initialize react-hook-form with zod and set current user values
  const form = useForm<Inputs>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: user?.username ?? "",
    },
  })

  function onSubmit(input: Inputs) {
    startTransition(async () => {
      try {
        await updateUsername(input)

        logAction({
          toastMessasge: "Имя пользователя обновлено.",
          status: "success",
        })
      } catch (error) {
        catchError(error)
      }
    })
  }

  if (!user) return null

  return (
    <Card
      as="section"
      className={cn("rounded-md border-none shadow-themed-border", className)}
      {...props}
    >
      <Form {...form}>
        <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
          <div className="relative border-b p-6">
            <CardTitle className="text-xl">Имя Пользователя</CardTitle>
            <p className="my-3 text-sm/6">
              Пожалуйста, введите свое полное имя или отображаемое имя, которое
              вам удобно.
            </p>
            <FormField
              control={form.control}
              name="username"
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
              Пожалуйста, используйте максимум 32 символа.
            </p>
            <Button disabled={isPending}>
              {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Сохранить
              <span className="sr-only">Сохранить имя пользователя</span>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default UpdateUsernameForm
