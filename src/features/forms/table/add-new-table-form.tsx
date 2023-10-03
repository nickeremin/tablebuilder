"use client"

import { Fragment, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, X } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Icons } from "@/shared/components/icons"
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
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { Separator } from "@/shared/components/ui/separator"
import { Textarea } from "@/shared/components/ui/textarea"
import { catchError } from "@/shared/lib/utils"
import { tableSchema } from "@/shared/lib/validations/table"
import { TableColumnDef } from "@/shared/types"
import { createTable } from "@/app/_actions/table"

type Inputs = z.infer<typeof tableSchema>

const AddNewTableForm = () => {
  const { user } = useUser()
  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(tableSchema),
    defaultValues: {
      name: "",
      description: "",
      columns: [
        {
          number: 0,
          name: "",
          type: "text",
        },
      ],
    },
  })

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control,
      name: "columns",
    }
  )

  const onSubmit = (input: Inputs) => {
    if (!user) return

    startTransition(async () => {
      await createTable(user.id, input)
      try {
        toast.success("Таблица успешно создана!")
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <>
      <Form {...form}>
        <form
          className="grid w-full max-w-xl gap-5"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input placeholder="Акты Панкрушиха" {...field} />
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
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Расскажите о чем эта таблица..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-table gap-2 overflow-auto pb-4">
            {fields.length ? (
              <>
                <p className="text-center text-sm">№</p>
                <p className="text-sm font-medium">Название</p>
                <p className="text-sm font-medium">Тип данных</p>
                <p></p>
              </>
            ) : null}
            {fields.map((field, index) => (
              <Fragment key={field.id}>
                <FormField
                  control={form.control}
                  name={`columns.${index}.number`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled
                          className="text-center"
                          {...field}
                          value={field.value + 1}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`columns.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Введите название столбца..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`columns.${index}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={"Выберите тип данных"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Типы</SelectLabel>
                            <SelectItem value="text">Текст</SelectItem>
                            <SelectItem value="date">Дата</SelectItem>
                            <SelectItem value="integer">Целое</SelectItem>
                            <SelectItem value="decimal">Десятичное</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    remove(index)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </Fragment>
            ))}
          </div>
          <Separator />
          <Button
            type="button"
            className="w-fit"
            variant="outline"
            onClick={() => {
              append({
                number: fields.length,
                name: "",
                type: "text",
              })
            }}
          >
            Добавить столбец
            <Icons.add className="ml-2 h-4 w-4" />
          </Button>
          <Button className="w-fit" disabled={isPending}>
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Создать
            <span className="sr-only">Create</span>
          </Button>
        </form>
      </Form>
      <DevTool control={form.control} />
    </>
  )
}

export default AddNewTableForm
