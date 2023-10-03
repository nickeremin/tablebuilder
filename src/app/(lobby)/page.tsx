import Link from "next/link"

import { Icons } from "@/shared/components/icons"
import { buttonVariants } from "@/shared/components/ui/button"
import { Shell } from "@/shared/components/ui/shell"
import { cn } from "@/shared/lib/utils"

const LobbyPage = async () => {
  return (
    <Shell>
      <div className="flex flex-col items-center gap-8 pt-16">
        <h1 className="text-7xl font-extrabold">Tablebuilder</h1>
        <Link
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            "group text-indigo-500 hover:text-indigo-500"
          )}
          href="/dashboard/account"
        >
          Перейти в личный кабинет
          <Icons.right className="ml-2 h-5 w-5 transition-all group-hover:translate-x-[6px]" />
        </Link>
      </div>
    </Shell>
  )
}

export default LobbyPage
