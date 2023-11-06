import * as React from "react"

import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

interface TablesPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  withTour?: boolean
}

function TablesPreview({ withTour, className, ...props }: TablesPreviewProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-10 lg:flex-row",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-5 lg:items-start">
        <div className="flex flex-col items-center gap-1 lg:flex-row">
          <span className="text-[40px] font-extrabold leading-none">
            Создавай.
          </span>
          <span className="text-[40px] font-extrabold leading-none">
            Таблицы.
          </span>
          <span className="text-[40px] font-extrabold leading-none">
            Легко.
          </span>
        </div>
        <p className="text-center text-lg text-muted-foreground lg:text-start">
          {/* Освободите себя от сложностей таблиц: храните и управляйте данными
          удобно. */}
          Мощный инструмент для эффективного управления данными. Создавайте и
          управляйте таблицами с легкостью, а также храните свои документы в
          одном месте.
        </p>
      </div>
      <div className="flex max-w-[250px] flex-col gap-4">
        <Button size="lg" className="whitespace-nowrap">
          Перейти к таблицам
        </Button>
        <Button size="lg" variant="outline" className="whitespace-nowrap">
          Ознакомиться с продуктом
        </Button>
      </div>
    </div>
  )
}

export default TablesPreview
