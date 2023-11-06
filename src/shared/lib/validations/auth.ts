import * as z from "zod"

// Schema validations for authentication with zod
export const authSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Пожалуйста, используйте минимум 2 символа." })
    .max(32, {
      message: "Пожалуйста, используйте максимум 32 символа.",
    }),
  subscriptionPlan: z.enum(["hobby", "pro"]),
  email: z.string().email({
    message: "Пожалуйста, введите действительный адрес электронной почты.",
  }),
  // password: z
  //   .string()
  //   .min(8, { message: "Пароль должен быть длиной не менее 8 символов." })
  //   .max(32, { message: "Пароль должен быть не длиннее 32 символов." })
  //   .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
  //     message:
  //       "Пароль должен содержать не менее 8 символов: одну заглавную, одну строчную, одну цифру и один специальный символ.",
  //   }),
})

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "Код подтверждения должен состоять из 6 символов.",
    })
    .max(6),
})

export const checkEmailSchema = z.object({
  email: authSchema.shape.email,
})
