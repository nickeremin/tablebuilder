"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import { Textarea } from "@/shared/components/ui/textarea"
import { contactSalesSupportSchema } from "@/shared/lib/validations/contact"

type Inputs = z.infer<typeof contactSalesSupportSchema>

function ContactSalesSupportForm() {
  const form = useForm<Inputs>({
    resolver: zodResolver(contactSalesSupportSchema),
  })

  //const isValid = form.getValues("email").length

  function onSubmit() {}

  return (
    <Form {...form}>
      <form
        className="grid gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Почтa</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Как мы можем вам помочь?</FormLabel>
              <FormControl>
                <Textarea className="h-40 resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-center lg:items-start">
          <Button
            disabled={
              !form.watch("email")?.length || !form.watch("description")?.length
            }
            className="relative h-10 w-40"
          >
            Отправить
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ContactSalesSupportForm
