import { notFound, redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { and, eq } from "drizzle-orm"

import { AddNewTableRecordForm } from "@/features/forms/table-record"
import { Shell } from "@/shared/components/shells/shell"
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
import { db } from "@/shared/db"
import { tables } from "@/shared/db/schema"

interface AddNewTableRecordPageProps {
  params: {
    tableId: string
  }
}

const AddNewTableRecordPage = async ({
  params,
}: AddNewTableRecordPageProps) => {
  const user = await currentUser()

  if (!user) redirect("/auth/signin")

  const tableId = params.tableId

  const table = await db.query.tables.findFirst({
    where: and(eq(tables.id, tableId), eq(tables.userId, user.id)),
  })

  if (!table) return notFound()

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="new-record-page-create-table"
        aria-labelledby="new-record-page-heading"
      >
        <PageHeaderHeading size="sm" className="flex-1">
          Новая Запись
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Добавьте новую запись в вашу таблицу
        </PageHeaderDescription>
      </PageHeader>
      <Card
        as="section"
        id="new-record-page-form-container"
        aria-labelledby="new-record-page-form-heading"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{table?.name}</CardTitle>
          <CardDescription>
            Добавьте новую запись в вашу таблицу
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddNewTableRecordForm tableId={tableId} />
        </CardContent>
      </Card>
    </Shell>
  )
}

export default AddNewTableRecordPage
