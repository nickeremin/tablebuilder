import { Suspense } from "react"
import { notFound, redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { and, asc, eq, sql } from "drizzle-orm"
import { ErrorBoundary } from "react-error-boundary"

import { RecordsTableShell } from "@/widgets/dashboard/tables"
import TableHeading from "@/widgets/layout/headings/table-heading"
import { Shell } from "@/shared/components/ui/shell"
import { db } from "@/shared/db"
import { tableRecords, tables } from "@/shared/db/schema"
import Loading from "@/app/(dashboard)/dashboard/tables/[tableId]/loading"

interface TablePageProps {
  params: {
    tableId: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const TablePage = async ({ params, searchParams }: TablePageProps) => {
  const tableId = params.tableId

  const { page, per_page, sort } = searchParams ?? {}

  const table = await db.query.tables.findFirst({
    where: eq(tables.id, tableId),
  })

  if (!table) return notFound()

  // Number of items per page
  const limit = typeof per_page === "string" ? parseInt(per_page) : 10

  // Number of items to skip
  const offset =
    typeof page === "string"
      ? parseInt(page) > 0
        ? (parseInt(page) - 1) * limit
        : 0
      : 0

  // Column and order to sort by
  const [column, order] =
    typeof sort === "string"
      ? (sort.split(".") as [string, "asc" | "desc" | undefined])
      : []

  const { items, count } = await db.transaction(async (tx) => {
    const items = await tx
      .select()
      .from(tableRecords)
      .limit(limit)
      .offset(offset)
      .where(and(eq(tableRecords.tableId, tableId)))

    const sortedItems = items.sort((a, b) => {
      const tableColumn = table.columns.find((c) => c.name === column)
      if (tableColumn) {
        const aValue = a.data[tableColumn.number]?.data
        const bValue = b.data[tableColumn.number]?.data

        if (!aValue || !bValue) return 0

        if (order === "asc") return aValue > bValue ? 1 : -1
        else return aValue > bValue ? -1 : 1
      } else return 0
    })

    const count = await tx
      .select({
        count: sql<number>`count(${tableRecords.id})`,
      })
      .from(tableRecords)
      .where(and(eq(tableRecords.tableId, tableId)))
      .then((res) => res[0]?.count ?? 0)

    return {
      items: sortedItems,
      count,
    }
  })

  const pageCount = Math.ceil(count / limit)

  return (
    <ErrorBoundary fallback={<p>Something went wrong...</p>}>
      <Suspense fallback={<Loading />}>
        <Shell variant="sidebar">
          <TableHeading tableId={tableId} />
          <RecordsTableShell
            data={items}
            columnValues={table.columns}
            pageCount={pageCount}
            tableId={tableId}
          />
        </Shell>
      </Suspense>
    </ErrorBoundary>
  )
}

export default TablePage
