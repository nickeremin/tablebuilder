"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCycle } from "framer-motion"

import CustomIcon from "@/shared/components/icons/custom-icon"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import { PageHeading } from "@/shared/components/ui/page-heading"
import { cn } from "@/shared/lib/utils"

import MobileMenuToggleButton from "../mobile-menu-toggle-button"
import MobileMenuHeaderWrapper from "./mobile-menu-header-wrapper"

function AuthHeader() {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const pathname = usePathname()

  //Based on pathname switch button on sign in or sign up
  const title = String(pathname).includes("signup")
    ? "Войти"
    : "Создать аккаунт"
  const href = String(pathname).includes("signup") ? "/signin" : "/signup"

  return (
    <MobileMenuHeaderWrapper
      isOpen={isOpen}
      backgroundColor="var(--background-hsl)"
    >
      <div className="flex h-16 w-full items-center px-6">
        <div className="flex flex-1 items-center">
          <Link href="/" className="flex items-center">
            <PageHeading size="logo" className="font-bold">
              Tablebuilder
            </PageHeading>
          </Link>
        </div>
        <div>
          <MobileMenuToggleButton isOpen={isOpen} toggleOpen={toggleOpen} />
        </div>
      </div>
    </MobileMenuHeaderWrapper>
    // <div className="shadow-border-nav sticky inset-x-0 top-0 z-50 flex h-16 justify-center bg-background/70 backdrop-blur-[20px] backdrop-saturate-200">
    //   <Shell as="header" variant="header">
    //     <div className="flex flex-1 items-center">
    //       <Link href="/" className="flex items-center gap-2">
    //         <PageHeading size="logo" className="font-bold">
    //           Tablebuilder
    //         </PageHeading>
    //       </Link>
    //     </div>
    //     <div className="hidden items-center gap-3 lg:flex">
    //       <Link
    //         href="/contact"
    //         className="text-tertiary px-1 py-0.5 text-sm font-medium transition-colors hover:text-primary"
    //       >
    //         Связаться с Нами
    //       </Link>
    //       <Link
    //         data-shadcnui-button
    //         href={href}
    //         className={cn(
    //           buttonVariants({
    //             variant: "outline",
    //           })
    //         )}
    //       >
    //         {title}
    //       </Link>
    //     </div>
    //     <div>
    //       <MobileNavMenu />
    //     </div>
    //   </Shell>
    // </div>
  )
}

export default AuthHeader
