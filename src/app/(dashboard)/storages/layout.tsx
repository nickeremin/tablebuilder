import * as React from "react"

import { Shell } from "@/shared/components/shells/shell"

interface StoragesLayoutProps {
  children: React.ReactNode
}

function StoragesLayout({ children }: StoragesLayoutProps) {
  return (
    <>
      <Shell as="div" className="my-6 min-h-[calc(100vh-300px)]">
        {children}
      </Shell>
    </>
  )
}

export default StoragesLayout
