import { redirect } from "next/navigation"

import { EmailAlert } from "@/entities/account"
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

const AccountPage = async () => {
  return (
    <Shell variant="sidebar">
      <PageHeader
        id="dashboard-account-page-header"
        aria-labelledby="dashboard-account-page-header-heading"
      >
        <PageHeaderHeading size="sm" className="flex-1">
          Личный кабинет
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Управление профилем и безопасностью
        </PageHeaderDescription>
      </PageHeader>
      <Card className="max-w-2xl">
        <CardHeader className="flex-row items-center gap-4">
          {/* <div className="flex flex-col gap-2">
            <CardTitle>{session.user.name}</CardTitle>
            <CardDescription>{session.user.email}</CardDescription>
          </div> */}
        </CardHeader>
        <CardContent>
          <EmailAlert isEmailVerified={true} />
        </CardContent>
      </Card>
    </Shell>
  )
}

export default AccountPage
