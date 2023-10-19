import React from "react"
import { DatabaseIcon } from "lucide-react"

function StoragesPage() {
  return (
    <div className="flex flex-col gap-6 rounded border bg-muted/30 px-4 py-8">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-xl border bg-background">
          <DatabaseIcon className="h-9 w-9 stroke-slate-800 stroke-1" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium">Создайте хранилище</p>
          <p className="max-w-[280px] text-center text-sm text-muted-foreground">
            Создавайте хранилища и сохраняйте в них ваши документы.
          </p>
        </div>
      </div>
    </div>
  )
}

export default StoragesPage
