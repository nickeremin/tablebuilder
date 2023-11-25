import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const shellVariants = cva("", {
  variants: {
    variant: {
      default: "max-w-full w-content-page-with-margin mx-auto px-4 lg:px-6",
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

const Shell = React.forwardRef<HTMLDivElement, ShellProps>(
  ({ className, variant, as: Comp = "div", ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={cn(shellVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Shell.displayName = "Shell"

export { Shell, shellVariants }
