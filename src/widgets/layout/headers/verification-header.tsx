import Link from "next/link"

import { Icons } from "@/shared/components/icons"
import { Shell } from "@/shared/components/shells/shell"
import { cn } from "@/shared/lib/utils"

function VerificationHeader() {
  return (
    <div
      className={cn(
        "sticky top-0 z-50 flex h-16 bg-background shadow-nav-border",
        // Before
        "before:absolute before:top-[-1px] before:-z-10 before:h-full before:w-full before:backdrop-blur-[6px] before:backdrop-saturate-200 before:content-['']"
      )}
    >
      <Shell as="header" variant="header">
        <div className="flex flex-1 justify-between">
          <Link
            aria-label="Перейти на главную страницу"
            href="/"
            className="flex items-center"
          >
            <Icons.logo className="mr-2 h-6 w-6" aria-hidden="true" />
            <h1 className="text-xl font-bold">Tablebuilder</h1>
          </Link>
        </div>
      </Shell>
    </div>
  )
}

export default VerificationHeader
