"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

import LogoIcon from "@/shared/components/logo"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

function AuthNav() {
  const pathname = usePathname()

  // Based on pathname switch button on sign in or sign up
  const btnTitle = String(pathname).includes("signup")
    ? "Войти"
    : "Создать аккаунт"
  const btnHref = String(pathname).includes("signup") ? "/signin" : "/signup"

  return (
    <div className="sticky top-0 z-50 flex h-16 shadow-nav-border before:absolute before:top-[-1px] before:-z-10 before:h-full before:w-full before:backdrop-blur-[6px] before:backdrop-saturate-200 before:content-['']">
      <header className="m-auto flex w-[var(--full)] max-w-[var(--full)] items-center justify-between px-6">
        <div className="flex flex-1 justify-between">
          <Link href="/" className="flex items-center">
            <LogoIcon className="mr-2 h-6 w-6" />
            <h1 className="text-xl font-bold">Tablebuilder</h1>
            <span className="sr-only">Перейти на главную страницу</span>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-muted shadow-none lg:hidden"
          >
            <HamburgerMenuIcon
              className="h-[18px] w-[18px] text-primary/80"
              aria-hidden="true"
            />
            <span className="sr-only">Открыть меню</span>
          </Button>
        </div>
        <div className="hidden flex-1 items-center justify-end gap-3 lg:flex">
          <Link
            href="/"
            className="m-0.5 p-0.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Помощь
            <span className="sr-only">Помощь</span>
          </Link>
          <Link
            href={btnHref}
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "whitespace-nowrap border-none shadow-themed-border",
              })
            )}
          >
            {btnTitle}
            <span className="sr-only">{btnTitle}</span>
          </Link>
        </div>
      </header>
    </div>
  )
}

export default AuthNav
