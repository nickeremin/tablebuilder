// "use client"

// import { useMemo, useState, useTransition } from "react"
// import Link from "next/link"
// import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation"
// import { DataTable } from "@/data-table"
// import DataTableColumnCell from "@/data-table/data-table-column-cell"
// import DataTableColumnHeader from "@/data-table/data-table-column-header"
// import { DotsHorizontalIcon } from "@radix-ui/react-icons"
// import { ColumnDef } from "@tanstack/react-table"
// import { toast } from "sonner"

// import { Button } from "@/shared/components/ui/button"
// import { Checkbox } from "@/shared/components/ui/checkbox"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from "@/shared/components/ui/dropdown-menu"
// import { catchError } from "@/shared/lib/utils"
// import { TableRecord } from "@/shared/types"
// import { deleteRecord } from "@/app/_actions/table-record"
// import { trpc } from "@/app/_trpc/client"

// interface UserRecordsTableProps {
//   tableId: string
// }

// const UserRecordsTable = ({ tableId }: UserRecordsTableProps) => {
//   const { data: table } = trpc.table.getUserTableById.useQuery(
//     {
//       tableId,
//     },
//     {
//       suspense: true,
//     }
//   )

//   const searchParams = useSearchParams() as ReadonlyURLSearchParams

//   const per_page = searchParams.get("per_page")

//   // Number of items per page
//   const limit = typeof per_page === "string" ? parseInt(per_page) : 10

//   const pageCount = Math.ceil(table.tableRecords.length / limit)

//   const [isPending, startTransition] = useTransition()
//   const [selectedRowIds, setSelectedRowIds] = useState<string[]>([])

//   const columns = useMemo<ColumnDef<TableRecord, unknown>[]>(
//     () => [
//       {
//         id: "select",
//         header: ({ table: t }) => (
//           <Checkbox
//             aria-label="Выбрать все"
//             className="translate-y-[2px]"
//             checked={t.getIsAllRowsSelected()}
//             onCheckedChange={(value) => {
//               t.toggleAllPageRowsSelected(!!value)
//               setSelectedRowIds((prev) =>
//                 prev.length === table.tableRecords.length
//                   ? []
//                   : table.tableRecords.map((row) => row.id)
//               )
//             }}
//           />
//         ),
//         cell: ({ row }) => (
//           <Checkbox
//             aria-label="Выбрать ряд"
//             className="translate-y-[2px]"
//             checked={row.getIsSelected()}
//             onCheckedChange={(value) => {
//               row.toggleSelected(!!value)
//               setSelectedRowIds((prev) =>
//                 value
//                   ? [...prev, row.original.id]
//                   : prev.filter((id) => id !== row.original.id)
//               )
//             }}
//           />
//         ),
//         enableSorting: false,
//         enableHiding: false,
//       },
//       ...table.columns.map(
//         (tableColumn, index) =>
//           ({
//             id: tableColumn.name,
//             header: ({ column }) => (
//               <DataTableColumnHeader column={column} title={tableColumn.name} />
//             ),
//             accessorFn: (row) => row.data[index]?.data,
//             cell: ({ row }) => (
//               <DataTableColumnCell
//                 data={row.original.data[index]?.data}
//                 type={tableColumn.type}
//               />
//             ),
//             enableSorting: true,
//           }) satisfies ColumnDef<TableRecord, unknown>
//       ),
//       {
//         id: "actions",
//         cell: ({ row }) => (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 aria-label="Открыть меню"
//                 variant="ghost"
//                 className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
//               >
//                 <DotsHorizontalIcon aria-hidden="true" className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-[160px]">
//               <DropdownMenuItem asChild>
//                 <Link
//                   className="hover:cursor-pointer"
//                   href={`/dashboard/tables/${tableId}/table-records/${row.original.id}/edit`}
//                 >
//                   Изменить
//                 </Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link
//                   className="hover:cursor-pointer"
//                   href={`/dashboard/tables/${tableId}/table-records/${row.original.id}`}
//                 >
//                   Посмотреть
//                 </Link>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem
//                 className="hover:cursor-pointer"
//                 onClick={() => {
//                   startTransition(() => {
//                     row.toggleSelected(false)

//                     toast.promise(deleteRecord(row.original), {
//                       loading: "Удаление...",
//                       success: () => "Запись успешно удалена.",
//                       error: (err: unknown) => catchError(err),
//                     })
//                   })
//                 }}
//                 disabled={isPending}
//               >
//                 Удалить
//                 <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         ),
//       },
//     ],
//     [isPending, tableId, table.tableRecords]
//   )

//   function deleteSelectedRows() {
//     toast.promise(
//       Promise.all(selectedRowIds.map((id) => deleteRecord({ id, tableId }))),
//       {
//         loading: "Удаление...",
//         success: () => {
//           setSelectedRowIds([])
//           return "Записи успешно удалены."
//         },
//         error: (error: unknown) => {
//           setSelectedRowIds([])
//           return catchError(error)
//         },
//       }
//     )
//   }

//   if (!table) return null

//   return (
//     <DataTable
//       columns={columns}
//       data={table.tableRecords}
//       pageCount={pageCount}
//       // searchableColumns={table.columns
//       //   .filter((column) => column.type === "text")
//       //   .map((column) => ({
//       //     id: column.name,
//       //     title: column.name,
//       //   }))}
//       addNewRowLink={`/dashboard/tables/${tableId}/table-records/new`}
//       deleteRowsAction={() => deleteSelectedRows()}
//     />
//   )
// }

// export default UserRecordsTable
