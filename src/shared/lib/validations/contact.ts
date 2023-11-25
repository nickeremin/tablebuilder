import * as z from "zod"

export const feedbackSchema = z.object({
  description: z.string(),
  emoji: z.enum(["love", "good", "bad", "hate"]),
})

export const contactSalesSupportSchema = z.object({
  email: z.string().email({
    message: "Пожалуйста, введите действительный адрес электронной почты.",
  }),
  description: z
    .string()
    .min(2, { message: "Пожалуйста, используйте минимум 2 символа." }),
})
