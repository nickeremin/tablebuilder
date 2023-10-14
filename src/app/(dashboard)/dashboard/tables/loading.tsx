import { TableCardsLoading } from "@/entities/skeletons"
import { Shell } from "@/shared/components/shells/shell"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/shared/components/ui/page-header"
import { Skeleton } from "@/shared/components/ui/skeleton"

const TablesLoading = () => {
  return (
    <Shell variant="sidebar">
      <PageHeader>
        <PageHeaderHeading size="sm">Таблицы</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Управляйте своими таблицами
        </PageHeaderDescription>
      </PageHeader>
      <Skeleton className="h-9 w-[120px]" />
      <TableCardsLoading />
    </Shell>
  )
}

export default TablesLoading
