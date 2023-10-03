"use client"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/shared/components/ui/page-header"
import { trpc } from "@/app/_trpc/client"

interface TableHeadingProps {
  tableId: string
}

const TableHeading = ({ tableId }: TableHeadingProps) => {
  const { data: table } = trpc.table.getUserTableById.useQuery(
    { tableId },
    { suspense: true }
  )

  if (!table) return null

  return (
    <PageHeader
      id="dashboard-act-table-page-header"
      aria-labelledby="dashboard-act-table-page-header-heading"
    >
      <PageHeaderHeading size="sm" className="flex-1">
        {table.name}
      </PageHeaderHeading>
      <PageHeaderDescription size="sm">
        {table.description}
      </PageHeaderDescription>
    </PageHeader>
  )
}

export default TableHeading
