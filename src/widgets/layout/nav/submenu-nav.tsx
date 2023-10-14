"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogoIcon } from "@/entities"
import { useInView } from "react-intersection-observer"

import { submenuLinks } from "@/shared/config/site/nav"
import { cn } from "@/shared/lib/utils"

function SubmenuNav() {
  const pathname = usePathname()

  const { ref, inView, entry } = useInView({
    threshold: 1,
  })

  return (
    <nav className="relative -mt-2.5 h-12 overflow-hidden border-b border-border">
      <nav className="flex h-12 items-center justify-center overflow-auto px-4 md:px-6">
        <Link
          href="/"
          className={cn(
            "my-auto mr-2 inline-flex h-6 w-6 appearance-none items-center p-0 transition-all duration-300",
            !inView
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-7 opacity-0"
          )}
        >
          <LogoIcon className="h-6 w-6" />
        </Link>
        <div
          ref={ref}
          className={cn(
            "flex flex-1 items-center transition-transform duration-300",
            inView ? "-translate-x-11" : "translate-x-0"
          )}
        >
          {submenuLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={cn(
                "relative whitespace-nowrap rounded px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-primary",
                link.href === String(pathname) ||
                  (link.href === "/account" &&
                    String(pathname) === "/account/general" &&
                    "text-primary")
              )}
            >
              {link.title}
              {link.href === String(pathname) ||
              (link.href === "/account" &&
                String(pathname) === "/account/general") ? (
                <div className="absolute -bottom-[6px] left-[4px] w-[calc(100%-8px)] border-b-[3px] border-primary transition-all" />
              ) : null}
            </Link>
          ))}
        </div>
      </nav>
    </nav>
  )
}

export default SubmenuNav
