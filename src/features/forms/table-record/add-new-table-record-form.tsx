"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { ControllerRenderProps, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Icons } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import { Calendar } from "@/shared/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import { catchError, cn } from "@/shared/lib/utils"
import { tableRecordSchema } from "@/shared/lib/validations/table-record"
import { addRecord } from "@/app/_actions/table-record"
import { trpc } from "@/app/_trpc/client"

type Inputs = z.infer<typeof tableRecordSchema>

interface AddNewTableRecordFormProps {
  tableId: string
}

const AddNewTableRecordForm = ({ tableId }: AddNewTableRecordFormProps) => {
  const { data: table } = trpc.table.getUserTableById.useQuery(
    { tableId },
    { suspense: true }
  )

  if (!table) return null

  const [isPending, startTransition] = useTransition()

  // Initializing react-hook-form with zod
  const form = useForm<Inputs>({
    resolver: zodResolver(tableRecordSchema),
    defaultValues: {
      data: [],
    },
  })

  const onSubmit = (input: Inputs) => {
    startTransition(async () => {
      try {
        await addRecord(
          tableId,
          input.data.map((item, index) => ({ data: item, number: index }))
        )
        toast.success(`Запись успешно добавлена!`)
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        {table.columns?.map((column, index) => (
          <FormField
            control={form.control}
            name={`data.${index}`}
            render={({ field }) =>
              column.type === "date" ? (
                <FormItem className="flex flex-col">
                  <FormLabel>{column.name}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value as number | Date, "PPP")
                          ) : (
                            <span>Выберите дату</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value as Date}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              ) : (
                <FormItem>
                  <FormLabel>{column.name}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Пусто"
                      {...(field as ControllerRenderProps<
                        {
                          data: (string | number | undefined)[]
                        },
                        `data.${number}`
                      >)}
                    />
                  </FormControl>
                </FormItem>
              )
            }
          />
        ))}
        <Button className="w-fit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Добавить
          <span className="sr-only">Add</span>
        </Button>
      </form>
    </Form>
  )
}

export default AddNewTableRecordForm
