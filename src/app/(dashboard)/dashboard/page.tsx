import { DashboardTables } from "@/widgets/pages"
import { Shell } from "@/shared/components/shells/shell"

async function DashboardPage() {
  return (
    <div className="bg-background-200 flex min-h-[calc(100vh-84px)] flex-col">
      <Shell>
        <div className="my-4 lg:my-6">
          <DashboardTables />
        </div>
      </Shell>
    </div>
  )
}

export default DashboardPage
