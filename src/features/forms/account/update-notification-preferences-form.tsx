"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Icons } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import { Checkbox } from "@/shared/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form"
import { notificationPreferences } from "@/shared/config/site/account"
import {
  notificationPreferencesSchema,
  updateNotificationPreferencesSchema,
} from "@/shared/lib/validations/account"
import { trpc } from "@/app/_trpc/client"

type Inputs = z.infer<typeof updateNotificationPreferencesSchema>

interface UpdateNotificationPreferencesFormProps {
  type: "web" | "email"
}

function UpdateNotificationPreferencesForm({
  type,
}: UpdateNotificationPreferencesFormProps) {
  const { data: user } = trpc.account.getUser.useQuery(void undefined, {
    suspense: true,
  })

  // Memoize public metadata during rendering
  const metadata = React.useMemo(() => {
    return notificationPreferencesSchema.parse(
      user?.publicMetadata.notificationPreferences
    )[type]
  }, [user])

  const [isPending, startTransition] = React.useTransition()

  // Initialize react-hook-form with zod and set current user values
  const form = useForm<Inputs>({
    resolver: zodResolver(updateNotificationPreferencesSchema),
    defaultValues: {
      type,
      ...metadata,
    },
  })

  function onSubmit(input: Inputs) {
    console.log(input)
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div className="flex flex-col gap-5">
          {notificationPreferences.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <p className="font-semibold">{group.title}</p>
              {group.items.map((item) => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem className="flex gap-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>{item.label}</FormLabel>
                        <FormDescription>{item.description}</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          ))}
          {/* <div className="flex flex-col gap-3">
            <p className="font-semibold">Личные</p>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="tableFailures"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Сбои таблиц</FormLabel>
                      <FormDescription>
                        Мы можем оповещать вас при возникновении ошибок в ваших
                        таблицах.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subscriptionExpiration"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-md border border-primary p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Истечение подписки</FormLabel>
                      <FormDescription>
                        Вы можете включить оповещение за неделю до конца
                        подписки.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

         
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Команды</p>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="teamTableChanges"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Изменение таблиц в командах</FormLabel>
                      <FormDescription>
                        Оповещение будет приходить каждый раз, когда один из
                        участников вашей команды будет вносить изменения в
                        таблицу.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teamJoinRequests"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Запросы на вступление в команду</FormLabel>
                      <FormDescription>
                        Оповещение придет, когда вас пригласят вступить в
                        команду.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

       
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Общие</p>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="newUpdates"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Новые обновления</FormLabel>
                      <FormDescription>
                        Получайте новости о выходе новых обновлений.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="warnings"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Предупреждения</FormLabel>
                      <FormDescription>
                        Мы будем высылать вам оповещения о технических
                        проблемах.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div> */}
        </div>
        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-fit"
          >
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Сохранить изменения
            <span className="sr-only">Сохранить изменения</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UpdateNotificationPreferencesForm
