import { AddNewTableForm } from "@/features/forms/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/shared/components/ui/page-header"
import { Shell } from "@/shared/components/ui/shell"
import Loading from "@/app/(dashboard)/dashboard/tables/new/loading"

const AddNewTablePage = () => {
  const isLoading = true
  if (!isLoading) return <Loading />

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="new-table-page-create-table"
        aria-labelledby="new-table-page-heading"
      >
        <PageHeaderHeading size="sm" className="flex-1">
          Новая Таблица
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Добавьте новую таблицу в ваш аккаунт
        </PageHeaderDescription>
      </PageHeader>
      <Card
        as="section"
        id="new-table-page-form-container"
        aria-labelledby="new-table-page-form-heading"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Добавьте таблицу</CardTitle>
          <CardDescription>
            Добавьте новую таблицу в ваш аккаунт
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddNewTableForm />
        </CardContent>
      </Card>
    </Shell>
  )
}

export default AddNewTablePage
