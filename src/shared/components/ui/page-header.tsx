import { cva, type VariantProps } from "class-variance-authority"
import { Balancer } from "react-wrap-balancer"

import { cn } from "@/shared/lib/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

function PageHeader({
  className,
  children,
  as: Comp = "section",
  ...props
}: PageHeaderProps) {
  return (
    <Comp className={cn("grid gap-1", className)} {...props}>
      {children}
    </Comp>
  )
}

const headingVariants = cva("tracking-tighter", {
  variants: {
    size: {
      default: "text-[32px]",
      logo: "text-xl",
      xs: "text-[24px] sm:text-[36px] leading-[1.1]",
      sm: "text-[32px] sm:text-[40px] leading-[1.1]",
      md: "text-[32px] sm:text-[44px] leading-[1.1]",
      lg: "text-[32px] sm:text-[48px] leading-[1.1]",
      xl: "text-[32px] sm:text-[52px] leading-[1.1]",
      "2xl": "text-[32px] sm:text-[56px] leading-[1.1]",
      "3xl": "text-[32px] sm:text-[52px] lg:text-[60px] leading-none",
      "4xl": "text-[32px] sm:text-[64px] leading-none",
      // logo: "text-xl font-bold",
      // sm: "text-2xl",
      // md: "text-[32px] sm:text-[40px]",
      // lg: "text-[32px] sm:text-[56px]",
      // xl: "text-[32px] sm:text-[64px] !leading-none",
      // xxl: "text-[32px] sm:text-[64px] !leading-none",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface PageHeaderHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

function PageHeading({
  className,
  size,
  as: Comp = "h1",
  ...props
}: PageHeaderHeadingProps) {
  return (
    <Balancer
      as={Comp}
      className={cn(headingVariants({ size, className }))}
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

export { PageHeader, PageHeaderDescription, PageHeading }
