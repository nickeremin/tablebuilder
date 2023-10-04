import React from "react"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/shared/components/ui/page-header"
import { Shell } from "@/shared/components/ui/shell"
import { Skeleton } from "@/shared/components/ui/skeleton"

const TableLoading = () => {
  return (
    <Shell variant="sidebar">
      <PageHeader>
        <Skeleton className="h-8 w-60" />
        <Skeleton className="h-6 w-80" />
      </PageHeader>
    </Shell>
  )
}

export default TableLoading
