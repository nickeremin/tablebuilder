import { notFound, redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { and, eq } from "drizzle-orm"
import { ErrorBoundary } from "react-error-boundary"

import { UserRecordsTable } from "@/widgets/dashboard/tables"
import TableHeading from "@/widgets/layout/page-headers/table-heading"
import { FallbackComponentErrorCard } from "@/entities/cards/error"
import { Shell } from "@/shared/components/shells/shell"
import { db } from "@/shared/db"
import { tables } from "@/shared/db/schema"

interface TablePageProps {
  params: {
    tableId: string
  }
}

const TablePage = async ({ params }: TablePageProps) => {
  const user = await currentUser()

  if (!user) redirect("/auth/signin")

  const tableId = params.tableId

  const table = await db.query.tables.findFirst({
    where: and(eq(tables.id, tableId), eq(tables.userId, user.id)),
  })

  if (!table) return notFound()

  return (
    <ErrorBoundary FallbackComponent={FallbackComponentErrorCard}>
      <Shell variant="sidebar">
        <TableHeading tableId={tableId} />
        <UserRecordsTable tableId={tableId} />
      </Shell>
    </ErrorBoundary>
  )
}

export default TablePage
