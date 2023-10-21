import * as React from "react"
import Link from "next/link"
import { CircleIcon, ValueIcon } from "@radix-ui/react-icons"

import { Icons } from "@/shared/components/icons"
import LogoIcon from "@/shared/components/logo"
import { buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

import ThemeToggle from "./theme-toggle"

function HomeFooter() {
  return (
    <footer className="border-t p-6 lg:py-12">
      <nav className="mx-auto flex max-w-[1400px] flex-nowrap justify-between">
        <div className="grid w-full grid-cols-[repeat(3,1fr)] gap-6">
          {/* Logo link and github account link */}
          <div className="flex flex-col justify-between gap-8">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center">
                <LogoIcon className="mr-2 h-6 w-6" />
                <span className="text-lg font-semibold">Tablebuilder</span>
              </Link>
              <span className="text-sm font-medium text-muted-foreground">
                &copy; 2023
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Создано{" "}
              <Link
                href="/"
                className="font-semibold transition-colors hover:text-foreground"
              >
                nickeremin
              </Link>
              .
            </p>
          </div>

          <div className="w-full">Footer links</div>

          {/* System state, github project link and theme toggle */}
          <div className="flex flex-col items-end gap-8">
            <p className="flex items-center gap-1 text-sm text-[rgb(var(--primary-blue))]">
              Все системы в норме.
              <span className="h-[10px] w-[10px] rounded-full bg-[rgb(var(--primary-blue))]" />
            </p>
            <div className="flex items-center gap-1">
              <Link
                href="/"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </footer>
  )
}

export default HomeFooter
