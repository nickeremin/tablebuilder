import * as React from "react"

import { StoragesPageHeader } from "@/widgets/layout/page-headers"
import { Shell } from "@/shared/components/shells/shell"
import { Spacer } from "@/shared/components/ui/spacer"

interface StoragesLayoutProps {
  children: React.ReactNode
}

function StoragesLayout({ children }: StoragesLayoutProps) {
  return (
    <>
      <StoragesPageHeader />
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

export default StoragesLayout
