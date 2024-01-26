import React from "react"

import { Skeleton } from "@/shared/components/ui/skeleton"

function OAuthLoading() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-12 rounded-lg" />
      <Skeleton className="h-12 rounded-lg" />
      <Skeleton className="h-12 rounded-lg" />
    </div>
  )
}

export default OAuthLoading
