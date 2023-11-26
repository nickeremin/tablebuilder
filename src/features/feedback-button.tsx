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
} from "@/shared/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import { Textarea } from "@/shared/components/ui/textarea"
import { feedbackSchema } from "@/shared/lib/validations/contact"

type Inputs = z.infer<typeof feedbackSchema>

function FeedbackButton() {
  // Initializing react-hook-form with zod
  const form = useForm<Inputs>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      description: "",
      emoji: undefined,
    },
  })

  function onSubmit() {}

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="text-primary/80">
          Поделиться
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[340px] rounded-xl">
        <Form {...form}>
          <form
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Напишите Ваш отзыв..."
                      className="h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}

export default FeedbackButton
