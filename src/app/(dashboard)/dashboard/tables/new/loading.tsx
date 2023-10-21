import { FormLoading } from "@/entities/loading"
import { Shell } from "@/shared/components/shells/shell"
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import { PageHeader } from "@/shared/components/ui/page-header"
import { Skeleton } from "@/shared/components/ui/skeleton"

const AddNewTableLoading = () => {
  return (
    <Shell variant="sidebar">
      <PageHeader>
        <Skeleton className="h-[33px] w-60" />
        <Skeleton className="h-6 w-80" />
      </PageHeader>
      <Card>
        <CardHeader className="space-y-1">
          <Skeleton className="h-8 w-full max-w-[200px]" />
          <Skeleton className="h-5 w-full max-w-[240px]" />
        </CardHeader>
        <CardContent>
          <FormLoading />
        </CardContent>
      </Card>
    </Shell>
  )
}

export default AddNewTableLoading
