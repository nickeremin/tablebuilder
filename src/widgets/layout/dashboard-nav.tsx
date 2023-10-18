"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BellIcon } from "@radix-ui/react-icons"
import { useInView } from "react-intersection-observer"

import { MultiSwitcher, UserNav } from "@/features/nav"
import LogoIcon from "@/shared/components/logo"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Separator } from "@/shared/components/ui/separator"
import { submenuLinks } from "@/shared/config/site/nav"
import { cn } from "@/shared/lib/utils"

function DashboardNav() {
  const pathname = usePathname()

  const { ref, inView, entry } = useInView({
    rootMargin: "-10px",
    threshold: 0,
  })

  return (
    <div className="bg-background">
      {/* Main nav */}
      <nav
        ref={ref}
        className="relative m-auto flex h-16 select-none items-center px-4 md:px-6"
      >
        <div className="flex flex-1 items-center pr-6">
          <div className="flex max-w-full items-center">
            <Link href="/dashboard" className="hidden md:block">
              <LogoIcon className="h-8 w-8" />
            </Link>
            <Separator
              orientation="vertical"
              className="mx-5 hidden h-8 rotate-[30deg] md:block"
            />
            <MultiSwitcher plan="free" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            aria-label="Поделиться отзывом"
            variant="outline"
            className="hidden md:flex"
          >
            Поделиться
            <span className="sr-only">Поделиться отзывом</span>
          </Button>
          <div className="flex items-center gap-2">
            <Button
              aria-label="Открыть уведомления"
              variant="outline"
              className="space-x-1 rounded-full px-2"
            >
              <BellIcon className="h-5 w-5" />
              <Badge className="bg-primary-blue hover:bg-primary-blue hidden rounded-full px-1.5 py-0.5 text-white shadow-none md:block">
                4
              </Badge>
              <span className="sr-only">Открыть уведомления</span>
            </Button>
            <UserNav />
          </div>
        </div>
      </nav>

      {/* Submenu nav */}
      <nav className="shadow-nav-border">
        <div className="relative -mt-2.5 h-12 overflow-hidden">
          <div
            className={cn(
              "transition-shadow",
              entry?.target &&
                !inView &&
                "fixed left-0 right-0 top-0 z-10 bg-background shadow-nav-border"
            )}
          >
            <div className="flex h-12 max-w-full items-center overflow-auto px-4 text-sm/6 font-medium md:gap-2 md:px-6">
              <Link
                href="/"
                className={cn(
                  "my-auto hidden h-6 w-6 appearance-none items-center transition-all duration-300 md:inline-flex",
                  entry?.target && !inView
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-7 opacity-0"
                )}
              >
                <LogoIcon className="h-6 w-6" />
              </Link>
              <div
                className={cn(
                  "flex flex-1 -translate-x-2 items-center transition-transform duration-300",
                  entry?.target && !inView
                    ? "md:translate-x-0"
                    : "md:-translate-x-11"
                )}
              >
                {submenuLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={cn(
                      "group relative py-3",
                      String(pathname).includes(link.href)
                        ? "text-primary before:absolute before:bottom-0 before:left-2.5 before:right-2.5 before:border-b-2 before:border-primary before:content-['']"
                        : "text-muted-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "select-none whitespace-nowrap rounded px-3 py-2 transition-colors duration-300 group-hover:bg-muted group-hover:hover:text-primary"
                      )}
                    >
                      {link.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default DashboardNav
