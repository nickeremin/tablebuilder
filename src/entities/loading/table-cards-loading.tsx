import { AspectRatio } from "@/shared/components/ui/aspect-ratio"
import { Card, CardHeader } from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"

import { AddNewTableCard } from "../cards/table"

const TableCardsLoading = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {/* <AddNewTableCard />
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i} className="h-full transition-all hover:-translate-y-4">
          <AspectRatio ratio={21 / 9}>
            <Skeleton className="absolute right-2 top-2 h-6 w-16" />
            <Skeleton className="h-full w-full" />
          </AspectRatio>
          <CardHeader className="space-y-[0.375rem]">
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-5 w-4/5" />
          </CardHeader>
        </Card>
      ))} */}
    </div>
  )
}

export default TableCardsLoading
