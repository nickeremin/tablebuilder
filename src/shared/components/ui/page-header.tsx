import { cva, type VariantProps } from "class-variance-authority"
import { Balancer } from "react-wrap-balancer"

import { cn } from "@/shared/lib/utils"

const headingVariants = cva("tracking-tighter", {
  variants: {
    variant: {
      gradient:
        "text-transparent bg-clip-text bg-gradient-to-b from-foreground/80 to-foreground",
    },
    size: {
      default: "text-[32px]",
      logo: "text-xl",
      xs: "text-[32px] sm:text-[36px] leading-[1.1]",
      sm: "text-[32px] sm:text-[40px] leading-[1.1]",
      md: "text-[32px] sm:text-[52px] leading-[1.1]",
      lg: "text-[32px] sm:text-[60px] leading-[1.1]",
      xl: "text-[32px] sm:text-[56px] lg:text-[72px] leading-[1.05]",
      xxl: "text-[40px] sm:text-[64px] lg:text-[80px] leading-[1.05]",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface PageHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

function PageHeading({
  className,
  variant,
  size,
  as: Comp = "h1",
  ...props
}: PageHeadingProps) {
  return (
    <Balancer
      as={Comp}
      className={cn(headingVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const descriptionVariants = cva("text-muted-foreground max-w-[750px]", {
  variants: {
    size: {
      default: "text-base sm:text-lg",
      sm: "text-sm sm:text-base",
      lg: "text-lg sm:text-xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface PageHeaderDescriptionProps
  extends React.ComponentProps<typeof Balancer>,
    VariantProps<typeof descriptionVariants> {}

function PageHeaderDescription({
  className,
  size,
  ...props
}: PageHeaderDescriptionProps) {
  return (
    <Balancer
      as="p"
      className={cn(descriptionVariants({ size, className }))}
      {...props}
    />
  )
}

export { PageHeaderDescription, PageHeading }
