"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

import { Icons } from "@/shared/components/icons"
import LogoIcon from "@/shared/components/logo"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion"
import { Button } from "@/shared/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet"
import { homeNav } from "@/shared/config/site/nav"

function MobileNavMenu() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Открыть меню"
          variant="outline"
          size="icon"
          className="rounded-full border-muted shadow-none lg:hidden"
        >
          <HamburgerMenuIcon
            className="h-[18px] w-[18px] text-primary/80"
            aria-hidden="true"
          />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <div>
          <Link
            aria-label="Перейти на главную страницу"
            href="/"
            className="flex items-center gap-2"
          >
            <LogoIcon className="h-6 w-6" aria-hidden="true" />
            <h1 className="text-xl font-bold leading-normal">Tablebuilder</h1>
          </Link>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <Button
            aria-label="Перейти на страницу входа"
            onClick={() => {
              router.push("/signin")
              setIsOpen(false)
            }}
            variant="outline"
            size="md"
            disabled={pathname?.includes("signin")}
          >
            Войти
          </Button>
          <Button
            aria-label="Перейти на страницу регистрации"
            onClick={() => {
              router.push("/signup")
              setIsOpen(false)
            }}
            size="md"
            disabled={pathname?.includes("signup")}
          >
            Создать аккаунт
          </Button>
        </div>
        <ul className="mt-4 list-none">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value={homeNav[0]!.title}>
              <AccordionTrigger className="text-base">
                {homeNav[0]!.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  {homeNav[0]?.items?.map((item) => {
                    const Icon = Icons[item.icon!]

                    return (
                      <Link
                        aria-label={`Перейти на страницу ${item.title}`}
                        key={item.title}
                        href={item.href ?? "/"}
                      >
                        <li className="flex h-12 items-center gap-2 text-base text-muted-foreground">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                          {item.title}
                        </li>
                      </Link>
                    )
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {homeNav
            .filter((_, i) => i !== 0)
            .map((item) => (
              <Link
                key={item.title}
                href={item.href ?? "/"}
                className="flex h-12 items-center border-b text-muted-foreground"
              >
                <li>{item.title}</li>
              </Link>
            ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavMenu
