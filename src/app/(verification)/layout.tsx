import * as React from "react"
import Link from "next/link"

import { SiteFooter } from "@/widgets/layout/home"
import LogoIcon from "@/shared/components/logo"
import { Shell } from "@/shared/components/shells/shell"

interface VerificationLayoutProps {
  children: React.ReactNode
}

function VerificationLayout({ children }: VerificationLayoutProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="relative min-h-screen">
        <div className="sticky top-0 z-50 flex h-16 shadow-nav-border before:absolute before:top-[-1px] before:-z-10 before:h-full before:w-full before:backdrop-blur-[6px] before:backdrop-saturate-200 before:content-['']">
          <Shell as="header" variant="header">
            <div className="flex flex-1 justify-between">
              <Link
                aria-label="Перейти на главную страницу"
                href="/"
                className="flex items-center"
              >
                <LogoIcon className="mr-2 h-6 w-6" aria-hidden="true" />
                <h1 className="text-xl font-bold">Tablebuilder</h1>
              </Link>
            </div>
          </Shell>
        </div>
        <main className="flex h-[calc(100vh-160px)] flex-col items-center justify-center">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}

export default VerificationLayout
