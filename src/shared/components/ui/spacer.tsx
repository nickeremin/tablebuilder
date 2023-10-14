import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const spacerVariants = cva("h-[1px] w-[1px] select-none ml-[23px]", {
  variants: {
    variant: {},
    size: {
      sm: "mt-[23px]",
      lg: "mt-[47px]",
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

interface SpacerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spacerVariants> {}

function Spacer({ variant, size, className, ...props }: SpacerProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(spacerVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Spacer, spacerVariants }
