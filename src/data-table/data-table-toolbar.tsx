import { useTransition } from "react"
import Link from "next/link"
import { Cross2Icon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button, buttonVariants } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { cn } from "@/shared/lib/utils"
import { type DataTableSearchableColumn } from "@/shared/types"

import DataTableViewOptions from "./data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchableColumns?: DataTableSearchableColumn<TData>[]
  addNewRowLink?: string
  deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>
}

const DataTableToolbar = <TData,>({
  table,
  searchableColumns = [],
  addNewRowLink,
  deleteRowsAction,
}: DataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <Input
                  key={String(column.id)}
                  placeholder={`Filter ${column.title}...`}
                  value={
                    (table
                      .getColumn(String(column.id))
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn(String(column.id))
                      ?.setFilterValue(event.target.value)
                  }
                  className="h-8 w-[150px] lg:w-[250px]"
                />
              )
          )}
        {isFiltered && (
          <Button
            aria-label="Сбросить фильтры"
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Сбросить
            <Cross2Icon className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {deleteRowsAction && table.getSelectedRowModel().rows.length > 0 ? (
          <Button
            aria-label="Удалить выбранные строки"
            variant="outline"
            size="sm"
            className="h-8"
            onClick={(event) => {
              startTransition(() => {
                table.toggleAllPageRowsSelected(false)
                deleteRowsAction(event)
              })
            }}
            disabled={isPending}
          >
            <TrashIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Удалить
          </Button>
        ) : addNewRowLink ? (
          <Link aria-label="Добавить новую строку" href={addNewRowLink}>
            <div
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "h-8",
                })
              )}
            >
              <PlusCircledIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Добавить
            </div>
          </Link>
        ) : null}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}

export default DataTableToolbar
