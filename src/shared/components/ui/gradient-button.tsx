"use client"

import * as React from "react"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium backdrop-blur-sm transition-colors select-none duration-300 focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-75",
  {
    variants: {
      variant: {
        default: "text-foreground border hover:border-accent-3",
      },
      size: {
        default: "h-12 rounded-xl py-4 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface GradientButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function GradientButton({
  className,
  variant,
  size,
  ...props
}: GradientButtonProps) {
  const gradient =
    "linear-gradient(0deg, hsl(var(--foreground)/.05), hsl(var(--foreground)/.05)), radial-gradient(50% 50% at 50% 100%, hsl(var(--foreground)/.1) 0%, hsl(var(--foreground)/0) 100%)"
  const btnRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const ref = btnRef.current

    const updateMousePosition = (e: MouseEvent) => {
      if (!ref) return

      const rect = ref.getBoundingClientRect()
      const { left, top } = rect

      const { clientX, clientY } = e

      const pointX = clientX - left
      const pointY = clientY - top

      ref.style.setProperty("--x", `${pointX}px`)
      ref.style.setProperty("--y", `${pointY}px`)
    }

    ref?.addEventListener("mousemove", updateMousePosition)

    return () => {
      ref?.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  return (
    <div className="relative overflow-visible transition-all">
      <div ref={btnRef} className="group relative overflow-hidden rounded-xl">
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at var(--x) var(--y), var(--accent-3), #0000000f)`,
          }}
        />
        <button
          className={cn(
            buttonVariants({
              variant,
              size,
              className,
            }),
            "relative"
          )}
          style={{
            backgroundImage: gradient,
          }}
          {...props}
        />
      </div>
    </div>
  )
}

export { GradientButton }
