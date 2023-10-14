"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMediaQuery } from "usehooks-ts"

import { accountLinks } from "@/shared/config/site/nav"
import { cn } from "@/shared/lib/utils"

function AccountNav() {
  const pathname = usePathname()
  const isMobileDevice = useMediaQuery("(min-width: 1024px)")

  return (
    <nav className="lg:sticky lg:mr-6">
      {accountLinks.map((link) => (
        <Link
          aria-label={link.title}
          key={link.href}
          href={
            !isMobileDevice
              ? link.href === "/account"
                ? "/account/general"
                : link.href
              : link.href
          }
          target={link.external ? "_blank" : ""}
          rel={link.external ? "noreferrer" : ""}
          className={cn(
            "block border-b py-6 text-sm transition-all duration-300 lg:-ml-3 lg:rounded-md lg:border-none lg:px-3 lg:py-2 lg:hover:bg-muted lg:hover:text-foreground",
            link.href === String(pathname) ||
              (link.href === "/account" &&
                String(pathname) === "/account/general")
              ? "lg:font-medium lg:text-primary"
              : "lg:text-muted-foreground",
            link.disabled && "pointer-events-none opacity-60"
          )}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  )
}

export default AccountNav
