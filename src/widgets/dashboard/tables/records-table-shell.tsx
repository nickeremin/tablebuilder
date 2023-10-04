"use client"

import { useMemo, useState, useTransition } from "react"
import Link from "next/link"
import { DataTable } from "@/data-table"
import DataTableColumnCell from "@/data-table/data-table-column-cell"
import DataTableColumnHeader from "@/data-table/data-table-column-header"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { index } from "drizzle-orm/mysql-core"
import { toast } from "sonner"

import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Checkbox } from "@/shared/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { catchError } from "@/shared/lib/utils"
import {
  DataTableSearchableColumn,
  TableColumnData,
  TableColumnDef,
  TableRecord,
} from "@/shared/types"
import { deleteRecord } from "@/app/_actions/table-record"
import { trpc } from "@/app/_trpc/client"

interface RecordsTableShellProps {
  data: TableRecord[]
  columnValues: TableColumnDef[]
  pageCount: number
  tableId: string
}

const RecordsTableShell = ({
  data,
  columnValues,
  pageCount,
  tableId,
}: RecordsTableShellProps) => {
  const [isPending, startTransition] = useTransition()
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([])

  const columns = useMemo<ColumnDef<TableRecord, unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            aria-label="Выбрать все"
            className="translate-y-[2px]"
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value)
              setSelectedRowIds((prev) =>
                prev.length === data.length ? [] : data.map((row) => row.id)
              )
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            aria-label="Выбрать ряд"
            className="translate-y-[2px]"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
              setSelectedRowIds((prev) =>
                value
                  ? [...prev, row.original.id]
                  : prev.filter((id) => id !== row.original.id)
              )
            }}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      ...columnValues.map(
        (tableColumn, index) =>
          ({
            id: tableColumn.name,
            header: ({ column }) => (
              <DataTableColumnHeader column={column} title={tableColumn.name} />
            ),
            accessorFn: (row) => row.data[index]?.data,
            cell: ({ row }) => (
              <DataTableColumnCell
                data={row.original.data[index]?.data}
                type={tableColumn.type}
              />
            ),
            enableSorting: true,
          }) satisfies ColumnDef<TableRecord, unknown>
      ),
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Открыть меню"
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <DotsHorizontalIcon aria-hidden="true" className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem asChild>
                <Link
                  className="hover:cursor-pointer"
                  href={`/dashboard/tables/${tableId}/table-records/${row.original.id}/edit`}
                >
                  Изменить
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  className="hover:cursor-pointer"
                  href={`/dashboard/tables/${tableId}/table-records/${row.original.id}`}
                >
                  Посмотреть
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={() => {
                  startTransition(() => {
                    row.toggleSelected(false)

                    toast.promise(deleteRecord(row.original), {
                      loading: "Удаление...",
                      success: () => "Запись успешно удалена.",
                      error: (err: unknown) => catchError(err),
                    })
                  })
                }}
                disabled={isPending}
              >
                Удалить
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [data, isPending, tableId]
  )

  function deleteSelectedRows() {}

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      // searchableColumns={table.columns
      //   .filter((column) => column.type === "text")
      //   .map((column) => ({
      //     id: column.name,
      //     title: column.name,
      //   }))}
      addNewRowLink={`/dashboard/tables/${tableId}/table-records/new`}
      deleteRowsAction={() => deleteSelectedRows()}
    />
  )
}

export default RecordsTableShell
