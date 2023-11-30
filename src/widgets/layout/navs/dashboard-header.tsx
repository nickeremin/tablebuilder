"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BellIcon } from "@radix-ui/react-icons"

import { MultiSwitcher, UserNav } from "@/features/nav"
import LogoIcon from "@/shared/components/logo"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Separator } from "@/shared/components/ui/separator"
import { submenuLinks } from "@/shared/config/site/nav"
import { cn } from "@/shared/lib/utils"

function DashboardHeader() {
  const pathname = usePathname()
  const submenuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const ref = submenuRef.current

    const handleScroll = () => {
      if (!ref) return

      if (window.scrollY >= 54) {
        ref.classList.add("dashboard-submenu")
      } else {
        ref.classList.remove("dashboard-submenu")
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Main nav */}
      <nav className="relative m-auto flex h-16 select-none items-center bg-background px-4 lg:px-6">
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
              <Badge className="hidden rounded-full bg-primary-blue px-1.5 py-0.5 text-white shadow-none hover:bg-primary-blue md:block">
                4
              </Badge>
              <span className="sr-only">Открыть уведомления</span>
            </Button>
            <UserNav />
          </div>
        </div>
      </nav>

      {/* Submenu nav */}
      <nav className="relative -mt-2.5 h-12 overflow-hidden">
        <div className="h-12 overflow-hidden">
          {/* TODO: Transition */}
          <div
            ref={submenuRef}
            className={cn("bg-background shadow-nav-border")}
          >
            <div className="flex h-12 items-end overflow-auto px-4 text-sm font-medium lg:px-6">
              <Link
                href="/"
                className={cn(
                  "invisible my-auto hidden h-6 w-6 appearance-none items-center transition-all duration-300 md:inline-flex",

                  "translate-y-0 opacity-100"
                  // "invisible -translate-y-7 opacity-0"
                )}
              >
                <LogoIcon className="h-6 w-6" />
              </Link>
              <div
                className={cn(
                  "flex flex-1  items-center transition-transform duration-300"
                )}
              >
                {submenuLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href ?? ""}
                    className={cn(
                      "group relative py-3.5",
                      String(pathname).includes(link.href!)
                        ? "text-primary before:absolute before:inset-x-2.5 before:bottom-0 before:border-b-2 before:border-primary before:content-['']"
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

      {/* Version 2 */}
      {/* <div>
        <nav>
          <div className="relative -mt-2.5 h-12 overflow-hidden">
            <div
              className={cn(
                "shadow-nav-border",
                !inView && "fixed inset-x-0 top-0 z-10 bg-background"
              )}
            >
              <div className="mb-[-1px] flex h-12 items-end overflow-auto px-4 text-sm font-medium lg:px-6">
                <Link
                  href="/"
                  className={cn(
                    "invisible my-auto hidden h-6 w-6 appearance-none items-center transition-all duration-300 md:inline-flex",

                    "translate-y-0 opacity-100"
                    // "invisible -translate-y-7 opacity-0"
                  )}
                >
                  <LogoIcon className="h-6 w-6" />
                </Link>
                <div
                  className={cn(
                    "flex flex-1  items-center transition-transform duration-300"
                  )}
                >
                  {submenuLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href ?? ""}
                      className={cn(
                        "group relative py-3.5",
                        String(pathname).includes(link.href!)
                          ? "text-primary before:absolute before:inset-x-2.5 before:bottom-0 before:border-b-2 before:border-primary before:content-['']"
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
      </div> */}

      {/* Version 1 */}
      {/* <nav className="">
        <div className="relative -mt-2.5 h-12 overflow-hidden">
          <div
            className={cn("bg-background shadow-nav-border transition-shadow")}
          >
            <div className="flex h-12 max-w-full items-center overflow-auto px-4 text-sm/6 font-medium md:gap-2 md:px-6">
              <Link
                href="/"
                className={cn(
                  "my-auto hidden h-6 w-6 appearance-none items-center transition-all duration-300 md:inline-flex",

                  "visible translate-y-0 opacity-100"
                  // "invisible -translate-y-7 opacity-0"
                )}
              >
                <LogoIcon className="h-6 w-6" />
              </Link>
              <div
                className={cn(
                  "flex flex-1  items-center transition-transform duration-300"
                )}
              >
                {submenuLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href ?? ""}
                    className={cn(
                      "group relative py-3",
                      String(pathname).includes(link.href!)
                        ? "text-primary before:absolute before:inset-x-2.5 before:bottom-0 before:border-b-2 before:border-primary before:content-['']"
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
      </nav> */}
    </>
  )
}

export default DashboardHeader
