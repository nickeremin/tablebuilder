import React from "react"

import { Skeleton } from "@/shared/components/ui/skeleton"

const FormLoading = () => {
  return (
    <div className="grid w-full max-w-xl gap-5">
      <div className="space-y-3">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-[60px] w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-9 w-full" />
      </div>
      <Skeleton className="h-9 w-24" />
    </div>
  )
}

export default FormLoading
