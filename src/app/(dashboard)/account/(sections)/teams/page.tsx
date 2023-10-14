import React from "react"

import { SearchTeams } from "@/widgets/account"
import { CreateTeamForm } from "@/features/forms/account"

function TeamsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Команды</h2>
          <CreateTeamForm />
        </div>
        <p className="text-sm text-muted-foreground">
          Управляйте командами, в которых вы участвуете, присоединяйтесь к
          предложенным или создавайте новые.
        </p>
      </div>
      <SearchTeams />
    </div>
  )
}

export default TeamsPage
