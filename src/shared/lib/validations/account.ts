import * as z from "zod"

export const updateAccountSchema = z.object({
  image: z.unknown().refine((val) => {
    return val instanceof File
  }, "Должен быть массив файлов."),
  username: z
    .string()
    .min(2, { message: "Пожалуйста, используйте минимум 2 символа." })
    .max(32, {
      message: "Пожалуйста, используйте максимум 32 символа.",
    }),
  email: z.string().email({
    message: "Пожалуйста, введите действительный адрес электронной почты.",
  }),
})

export function getDeleteAccountSchema({
  username,
  deleteString,
}: {
  username: string
  deleteString: string
}) {
  return z.object({
    username: z.string().refine((val) => {
      return val === username ? true : false
    }, `Введенный вами текст не соответствует "${username}".`),
    deleteString: z.string().refine((val) => {
      return val === deleteString ? true : false
    }, `Введенный вами текст не соответствует "${deleteString}".`),
  })
}

export const updateNotificationPreferencesSchema = z.object({
  type: z.enum(["web", "email"]),
  tableFailures: z.boolean(),
  newUpdates: z.boolean(),
  subscriptionExpiration: z.boolean(),
  teamTableChanges: z.boolean(),
  teamJoinRequests: z.boolean(),
  warnings: z.boolean(),
})

export const notificationPreferencesSchema = z.object({
  web: z.object({
    tableFailures: z.boolean(),
    newUpdates: z.boolean(),
    subscriptionExpiration: z.boolean(),
    teamTableChanges: z.boolean(),
    teamJoinRequests: z.boolean(),
    warnings: z.boolean(),
  }),
  email: z.object({
    tableFailures: z.boolean(),
    newUpdates: z.boolean(),
    subscriptionExpiration: z.boolean(),
    teamTableChanges: z.boolean(),
    teamJoinRequests: z.boolean(),
    warnings: z.boolean(),
  }),
})
