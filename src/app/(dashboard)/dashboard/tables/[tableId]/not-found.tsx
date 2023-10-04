import { ErrorCard } from "@/entities/cards/error"
import { Shell } from "@/shared/components/ui/shell"

const TableNotFound = () => {
  return (
    <Shell className="mt-8 max-w-2xl">
      <ErrorCard
        title="Таблица не найдена"
        description="Возможно, срок действия таблицы истек или вы обновили ее."
        retryLink="/dashboard/tables"
        retryLinkText="Вернуться к таблицам"
      />
    </Shell>
  )
}

export default TableNotFound
