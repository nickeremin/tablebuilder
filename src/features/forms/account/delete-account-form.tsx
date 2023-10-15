"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Icons } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import { Card, CardFooter, CardTitle } from "@/shared/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Spacer } from "@/shared/components/ui/spacer"
import { catchError, cn, logAction } from "@/shared/lib/utils"
import { getDeleteAccountSchema } from "@/shared/lib/validations/account"
import { trpc } from "@/app/_trpc/client"

interface DeleteAccountrFormProps extends React.HTMLAttributes<HTMLDivElement> {
  username: string
  deleteString: string
}

function DeleteAccountrForm({
  username,
  deleteString,
  className,
  ...props
}: DeleteAccountrFormProps) {
  const router = useRouter()

  const { mutateAsync: deleteAccount } =
    trpc.account.deleteAccount.useMutation()

  const [isPending, startTransition] = React.useTransition()
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] =
    React.useState(false)

  // Getting dynamic schema based on username and delete sentence
  const deleteAccountSchema = getDeleteAccountSchema({ username, deleteString })
  type Inputs = z.infer<typeof deleteAccountSchema>

  // Initialize react-hook-form with zod
  const form = useForm<Inputs>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      username: "",
      deleteString: "",
    },
  })

  function onSubmit() {
    startTransition(async () => {
      try {
        // Delete user account and then redirect him to sign in page
        await deleteAccount()

        router.push("/auth/signin")

        logAction({
          toastMessasge: "Ваш аккаунт удален.",
          status: "success",
        })
      } catch (error) {
        catchError
      }
    })
  }

  return (
    <Dialog
      open={showDeleteAccountDialog}
      onOpenChange={setShowDeleteAccountDialog}
    >
      <Card
        as="section"
        className={cn(
          "w-full rounded-md border-destructive/50 shadow-none",
          className
        )}
        {...props}
      >
        <div className="relative border-b border-destructive/50 p-6">
          <CardTitle className="text-xl">Удалить Аккаунт</CardTitle>
          <p className="my-3 text-sm/6">
            Навсегда удалите свой личный аккаунт и все его содержимое с
            платформы Timebuilder. Это действие необратимо, поэтому продолжайте
            с осторожностью.
          </p>
        </div>
        <CardFooter className="min-h-[56px] justify-center bg-destructive/30 py-6 md:justify-end md:py-3">
          <DialogTrigger asChild>
            <Button variant="destructive">Удалить Аккаунт</Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      <DialogContent className="flex max-h-[min(800px,80vh)] flex-col p-0">
        <Form {...form}>
          <form
            className="overflow-y-auto overflow-x-hidden"
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            {/* Use overflow-y-auto to show buttons in bottom */}
            <div className="relative overflow-y-auto overflow-x-hidden p-8">
              <div>
                <h1 className="text-2xl font-semibold">Удалить Аккаунт</h1>
                <Spacer />
                <p className="text-primary/80">
                  Tablebuilder{" "}
                  <strong className="text-primary">
                    удалит все ваши таблицы
                  </strong>
                  , а также все ваши файлы и все другие ресурсы, принадлежащие
                  вашей Личной учетной записи.
                </p>
                <Spacer />
                <p className="text-primary/80">
                  Tablebuilder рекомендует сохранить все ваши таблицы, файлы и
                  все другие ресурсы локально на данный компьютер.
                </p>
                <Spacer />
                <p className="flex items-center rounded-md bg-destructive/50 px-3 py-2 text-sm text-red-800 dark:text-red-200">
                  Это действие необратимо. Пожалуйста, будьте уверены.
                </p>
                <Spacer />
                <div className="-mx-8 -mb-8 border-t bg-muted/30 px-8 py-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          Введите свое имя пользователя{" "}
                          <strong className="text-primary/80">
                            {username}
                          </strong>
                          , чтобы продолжить:
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-background shadow-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Spacer />
                  <FormField
                    control={form.control}
                    name="deleteString"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          Для проверки введите{" "}
                          <strong className="text-primary/80">
                            {deleteString}
                          </strong>{" "}
                          ниже:
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-background shadow-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Back and delte buttons */}
            <div className="sticky bottom-0 flex justify-between rounded-b-lg border-t bg-background p-4">
              <Button
                type="button"
                disabled={isPending}
                variant="outline"
                className="bg-background"
                onClick={() => setShowDeleteAccountDialog(false)}
              >
                Отмена
                <span className="sr-only">Отменить удаление аккаунта</span>
              </Button>
              <Button disabled={isPending} variant="destructive">
                {isPending && (
                  <Icons.spinner
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Удалить
                <span className="sr-only">Подтвердить удаление аккаунта</span>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteAccountrForm
