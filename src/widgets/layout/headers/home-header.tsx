"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@clerk/nextjs"

import { UserNav } from "@/features/nav"
import { Icons } from "@/shared/components/icons"
import LogoIcon from "@/shared/components/logo"
import { Shell } from "@/shared/components/shells/shell"
import { buttonVariants } from "@/shared/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/shared/components/ui/navigation-menu"
import { PageHeading } from "@/shared/components/ui/page-header"
import { homeNav } from "@/shared/config/site/nav"
import { cn } from "@/shared/lib/utils"

import MobileNavMenu from "../navs/mobile-nav-menu"

function HomeHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname()
  const { isSignedIn, isLoaded } = useUser()

  const [scrollPosition, setScrollPosition] = React.useState(0)

  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position)
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "sticky top-0 z-50 flex h-16 items-center justify-center transition-shadow",
        "bg-background shadow-nav-border lg:bg-transparent lg:shadow-none",
        scrollPosition && "lg:!bg-background lg:!shadow-nav-border",
        className
      )}
      {...props}
    >
      <Shell as="header" variant="header">
        <div className="flex flex-1 items-center gap-8">
          <div className="flex w-full items-center justify-between">
            <Link
              aria-label="Перейти на главную страницу"
              href="/"
              className="flex h-9 items-center gap-2"
            >
              <LogoIcon className="h-6 w-6" aria-hidden="true" />
              <PageHeading size="logo" className="font-bold">
                Tablebuilder
              </PageHeading>
            </Link>
            <MobileNavMenu />
          </div>
          <div className="hidden flex-1 items-center xl:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-muted-foreground">
                    {homeNav[0]?.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[600px] grid-cols-[.8fr_1fr] gap-3 p-6">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <LogoIcon className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Tablebuilder
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Освободите себя от сложностей таблиц: храните и
                              управляйте данными удобно.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {homeNav[0]?.items?.map((item) => {
                        const Icon = Icons[item.icon ?? "spinner"]

                        return (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href ?? "/"}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="flex items-center gap-[6px] text-sm font-medium leading-none">
                                  <Icon className="h-4 w-4 stroke-[1.5] text-primary/80" />
                                  {item.title}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        )
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {homeNav
                  .filter((_, i) => i !== 0)
                  .map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle({
                            className: "text-muted-foreground",
                          }),
                          pathname?.includes(item.href!) &&
                            "bg-accent text-accent-foreground"
                        )}
                        asChild
                      >
                        <Link
                          aria-label={`Перейти на страницу ${item.title}`}
                          href={item.href ?? "/"}
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="hidden flex-1 items-center justify-end gap-3 xl:flex">
          <Link
            aria-label="Перейти на страницу Связаться с нами"
            href="/contact"
            className="m-0.5 p-0.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Связаться с нами
          </Link>
          {/* 
            If the user is not logged in, display null 
            otherwise display the login and register buttons or user navigation image 
            depending on whether the user is logged in or not
          */}
          {isLoaded ? (
            isSignedIn ? (
              <UserNav />
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  aria-label="Перейти на страницу входа"
                  href="/signin"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                    })
                  )}
                >
                  Войти
                </Link>
                <Link
                  aria-label="Перейти на страницу регистрации"
                  href="/signup"
                  className={cn(buttonVariants())}
                >
                  Создать аккаунт
                </Link>
              </div>
            )
          ) : null}
        </div>
      </Shell>
    </div>
  )
}

export default HomeHeader
