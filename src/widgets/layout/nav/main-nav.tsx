import Link from "next/link"
import { BellIcon } from "@radix-ui/react-icons"

import { MultiSwitcher, UserNav } from "@/features/nav"
import LogoIcon from "@/entities/logo"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Separator } from "@/shared/components/ui/separator"
import { themeVariants } from "@/shared/config/site/themes"
import { cn } from "@/shared/lib/utils"

function MainNav() {
  return (
    <nav className="relative m-auto flex h-16 items-center px-4 md:gap-6 md:px-6">
      <div className="flex h-16 flex-1 items-center gap-4">
        <Link href="/dashboard" className="hidden md:block">
          <LogoIcon />
        </Link>
        <Separator orientation="vertical" className="hidden h-8 md:block" />
        <MultiSwitcher plan="free" />
      </div>
      <div className="flex h-16 items-center gap-3 md:gap-6">
        <Button
          aria-label="Поделиться отзывом"
          variant="outline"
          className={cn(
            "hidden md:flex",
            themeVariants({
              variant: "hover:bg-border:sky-fuchsia",
            })
          )}
        >
          Поделиться
          <span className="sr-only">Поделиться отзывом</span>
        </Button>
        <Button
          aria-label="Открыть уведомления"
          variant="outline"
          className="space-x-1 rounded-full px-2"
        >
          <BellIcon className="h-5 w-5" />
          <Badge
            className={cn(
              "hidden rounded-full px-1.5 py-0.5 md:block",
              themeVariants({ variant: "bg:sky-fuchsia" })
            )}
          >
            4
          </Badge>
          <span className="sr-only">Открыть уведомления</span>
        </Button>
        <UserNav />
      </div>
    </nav>
  )
}

export default MainNav
