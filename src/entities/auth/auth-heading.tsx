import React from "react"

import { PageHeading } from "@/shared/components/ui/page-heading"

interface AuthHeadingProps {
  children: React.ReactNode
}

function AuthHeading({ children }: AuthHeadingProps) {
  return (
    <div className="max-w-[400px]">
      <PageHeading
        className="text-center font-bold"
        variant="gradient"
        size="xs"
      >
        {children}
      </PageHeading>
    </div>
  )
}

export default AuthHeading
