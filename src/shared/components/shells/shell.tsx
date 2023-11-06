import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const shellVariants = cva("", {
  variants: {
    variant: {
      default: "max-w-full w-content-page-with-margin mx-auto px-6",
      header: "w-page-with-margin m-auto flex items-center px-6",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface ShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType
}

function Shell({ className, as: Comp = "div", variant, ...props }: ShellProps) {
  return (
    <Comp className={cn(shellVariants({ variant }), className)} {...props} />
  )
}

export { Shell, shellVariants }
