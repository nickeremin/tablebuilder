import React from "react"

import { PageHeading } from "@/shared/components/ui/page-heading"
import { cn } from "@/shared/lib/utils"

interface AuthHeadingProps {
  children: React.ReactNode
  className?: string
}

function AuthHeading({ children, className }: AuthHeadingProps) {
  return (
    <div className="max-w-[400px]">
      <PageHeading
        className={cn("text-center font-bold", className)}
        variant="gradient"
        size="xs"
      >
        {children}
      </PageHeading>
    </div>
  )
}

export default AuthHeading
