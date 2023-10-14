import * as z from "zod"

import { updateNotificationPreferencesSchema } from "@/shared/lib/validations/account"

const updateNotificationPreferencesSchemaWithoutType =
  updateNotificationPreferencesSchema.omit({ type: true })

type NotificationItem = {
  name: keyof z.infer<typeof updateNotificationPreferencesSchemaWithoutType>
  label: string
  description: string
}

type NotificationGroup = {
  title: string
  items: NotificationItem[]
}

export const notificationPreferences: NotificationGroup[] = [
  {
    title: "Личные",
    items: [
      {
        name: "tableFailures",
        label: "Сбои таблиц",
        description:
          "Мы можем оповещать вас при возникновении ошибок в ваших таблицах.",
      },
      {
        name: "subscriptionExpiration",
        label: "Истечение подписки",
        description:
          "Вы можете включить оповещение за неделю до конца подписки.",
      },
    ],
  },
  {
    title: "Команды",
    items: [
      {
        name: "teamTableChanges",
        label: "Изменение таблиц в командах",
        description:
          "Оповещение будет приходить каждый раз, когда один из участников вашей команды будет вносить изменения в таблицу.",
      },
      {
        name: "teamJoinRequests",
        label: "Приглашения в команду",
        description:
          "Оповещение придет, когда вас пригласят вступить вкоманду.",
      },
    ],
  },
  {
    title: "Общие",
    items: [
      {
        name: "newUpdates",
        label: "Новые обновления",
        description: "Получайте новости о выходе новых обновлений.",
      },
      {
        name: "warnings",
        label: "Предупреждения",
        description:
          "Мы будем высылать вам оповещения о технических проблемах.",
      },
    ],
  },
]
