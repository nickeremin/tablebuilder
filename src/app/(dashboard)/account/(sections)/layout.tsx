import * as React from "react"
import Link from "next/link"
import { ChevronLeftIcon } from "@radix-ui/react-icons"

import { AccountNav } from "@/widgets/layout/dashboard"

interface AccountSectionsLayoutProps {
  children: React.ReactNode
}

function SectionsAccountLayout({ children }: AccountSectionsLayoutProps) {
  return (
    <>
      <aside className="relative flex flex-col">
        {/* Back link with mobile menu */}
        <Link href="/account" className="-mx-6 border-b p-6 lg:hidden">
          <div className="flex items-center text-sm font-semibold">
            <ChevronLeftIcon className="mr-2 h-5 w-5" />
            Настройки Акканута
          </div>
        </Link>
        <div className="hidden lg:block">
          <AccountNav />
        </div>
      </aside>
      <div className="relative mt-6 flex flex-col lg:ml-6 lg:mt-0">
        <main>{children}</main>
      </div>
    </>
  )
}

export default SectionsAccountLayout
