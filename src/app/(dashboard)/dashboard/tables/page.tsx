import { ErrorBoundary } from "react-error-boundary"

import { AllUserTables } from "@/widgets/dashboard/tables"
import { TableFilters } from "@/widgets/table"
import { FallbackComponentErrorCard } from "@/entities/cards/error"
import { AddNewTableCard } from "@/entities/cards/table"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/shared/components/ui/page-header"
import { Shell } from "@/shared/components/ui/shell"

const TablesPage = async () => {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponentErrorCard}>
      <Shell variant="sidebar">
        <PageHeader
          id="dashboard-tables-page-header"
          aria-labelledby="dashboard-tables-page-header-heading"
        >
          <PageHeaderHeading size="sm">Таблицы</PageHeaderHeading>
          <PageHeaderDescription size="sm">
            Управляйте своими таблицами
          </PageHeaderDescription>
        </PageHeader>
        <TableFilters />
        <section
          id="dashboard-invoice-tables-page-invoice-tables"
          aria-labelledby="dashboard-invoice-tables-page-invoice-tables-heading"
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          <AddNewTableCard />
          <AllUserTables />
        </section>
      </Shell>
    </ErrorBoundary>
  )
}

export default TablesPage
