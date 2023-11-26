"use client"

import { useEffect, useState, useTransition } from "react"
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"

import { Icons } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import { MultiSelect } from "@/shared/components/ui/multi-select"
import { Separator } from "@/shared/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet"
import { useCreateQueryString } from "@/shared/lib/hooks"
import { Option } from "@/shared/types"
import { trpc } from "@/app/_trpc/client"

const TableFilters = () => {
  const { data: tables } = trpc.table.getAllUserTables.useQuery(
    void undefined,
    {
      suspense: true,
    }
  )

  const router = useRouter()
  const searchParams = useSearchParams() as ReadonlyURLSearchParams
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const createQueryString = useCreateQueryString(searchParams)

  // Type filter
  const [selectedTableTypes, setSelectedTableTypes] = useState<Option[] | null>(
    null
  )

  // const tableTypeOptions = tables?.map((table) => ({
  //   label: toTitleCase(table.type),
  //   value: table.type,
  // }))

  useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          tableTypes: selectedTableTypes?.length
            ? selectedTableTypes.map((t) => t.value).join(".")
            : null,
        })}`,
        { scroll: false }
      )
    })
  }, [selectedTableTypes])

  if (!tables) return null

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Filter tables"
          className="w-fit"
          disabled={isPending}
        >
          <Icons.filter className="mr-2 h-4 w-4" />
          Фильтры
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="px-1">
          <SheetTitle>Фильтры</SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="flex flex-1 flex-col gap-5 overflow-hidden px-1">
          {tables.length ? (
            <div className="space-y-4">
              <h3 className="text-sm font-medium tracking-wide text-foreground">
                Тип
              </h3>
              <MultiSelect
                selected={selectedTableTypes}
                setSelected={setSelectedTableTypes}
                options={[]}
              />
            </div>
          ) : null}
        </div>
        <Separator />
        <SheetFooter>
          <Button
            aria-label="Clear filters"
            size="sm"
            className="w-full text-sm"
            onClick={() => {
              startTransition(() => {
                router.push(
                  `${pathname}?${createQueryString({
                    tableTypes: null,
                  })}`
                )
                setSelectedTableTypes(null)
              })
            }}
            disabled={isPending}
          >
            Очистить фильтры
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default TableFilters
