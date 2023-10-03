import React from "react"

import { Shell } from "@/shared/components/shells"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/shared/components/ui/page-header"
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
