import { Suspense } from "react"
import { notFound, redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { and, eq } from "drizzle-orm"
import { ErrorBoundary } from "react-error-boundary"

import { TableHeading, TableWithRecords } from "@/widgets/table"
import { Shell } from "@/shared/components/shells"
import { db } from "@/shared/db"
import { tables } from "@/shared/db/schema"
import Loading from "@/app/(dashboard)/dashboard/tables/[tableId]/loading"

interface TablePageProps {
  params: {
    tableId: string
  }
}

const TablePage = async ({ params }: TablePageProps) => {
  const user = await currentUser()

  if (!user) redirect("/auth/signin")

  const tableId = params.tableId

  const userTable = await db.query.tables.findFirst({
    where: and(eq(tables.id, tableId), eq(tables.userId, user.id)),
  })

  if (!userTable) return notFound()

  return (
    <ErrorBoundary fallback={<p>Something went wrong...</p>}>
      <Suspense fallback={<Loading />}>
        <Shell variant="sidebar">
          <TableHeading tableId={tableId} />
          <TableWithRecords tableId={tableId} />
        </Shell>
      </Suspense>
    </ErrorBoundary>
  )
}

export default TablePage
