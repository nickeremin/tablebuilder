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
      <Shell as="div" className="my-6 min-h-[calc(100vh-300px)]">
        {children}
      </Shell>
    </>
  )
}

export default StoragesLayout
