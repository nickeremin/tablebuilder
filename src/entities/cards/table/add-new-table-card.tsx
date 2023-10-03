import Link from "next/link"
import { PlusCircle } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"

const AddNewTableCard = () => {
  return (
    <Link href={`/dashboard/tables/new`}>
      <div className="group relative flex h-full w-full items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-50/50 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-500/10">
        <div className="bg-add-table absolute inset-0 opacity-20 dark:opacity-80"></div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PlusCircle className="relative h-10 w-10 stroke-[0.75] text-cyan-600 transition-all group-hover:scale-[1.5] dark:text-emerald-200" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Добавить новую таблицу</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Link>
  )
}

export default AddNewTableCard
