import * as React from "react"

import { AccountNav } from "@/widgets/layout"

interface AccountLayoutProps {
  children: React.ReactNode
}

function DefaultAccountLayout({ children }: AccountLayoutProps) {
  return (
    <>
      <aside className="relative flex flex-col">
        <AccountNav />
      </aside>
      <div className="relative mt-6 hidden flex-col lg:ml-6 lg:mt-0 lg:flex">
        <main>{children}</main>
      </div>
    </>
  )
}

export default DefaultAccountLayout
