import * as React from "react"

import { AccountPageHeader } from "@/widgets/layout/page-headers"
import { Shell } from "@/shared/components/shells/shell"
import { Spacer } from "@/shared/components/ui/spacer"

interface AccountLayoutProps {
  children: React.ReactNode
}

function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <>
      <AccountPageHeader />
      <Spacer aria-hidden="true" size="lg" className="hidden lg:block" />
      <Shell as="div">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)]">
          {children}
        </div>
      </Shell>
      <Spacer aria-hidden="true" size="lg" />
    </>
  )
}

export default AccountLayout
