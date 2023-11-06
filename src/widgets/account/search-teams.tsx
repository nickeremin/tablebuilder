"use client"

import * as React from "react"

import { CreateTeamForm } from "@/features/forms/account"
import { Input } from "@/shared/components/ui/input"

function SearchTeams() {
  const [value, setValue] = React.useState("")

  return (
    <div className="flex flex-col gap-5">
      <Input
        disabled={true}
        placeholder="Поиск команды"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        className="h-10 shadow-none"
      />

      <div className="flex h-[360px] flex-col items-center justify-center gap-8 rounded-md border bg-muted/50 px-4 py-8">
        <div className="flex flex-col items-center gap-2">
          <p className="font-medium">Команды не найдены</p>
          <p className="text-center text-sm text-muted-foreground">
            Создайте новую команду Tablebuilder для сотрудничества с другими
            пользователями.
          </p>
        </div>
        <CreateTeamForm />
      </div>
    </div>
  )
}

export default SearchTeams
