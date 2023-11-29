import * as React from "react"
import Link from "next/link"

import { Shell } from "@/shared/components/shells/shell"
import { buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

function HomePreview({}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Shell className="relative flex flex-col items-center justify-between gap-10 py-12 md:pt-[100px] lg:gap-16 lg:py-16 lg:pt-[120px]">
      <div className="relative z-20 flex flex-col items-center gap-5">
        <div className="flex flex-col items-center justify-center gap-1 text-[52px] font-extrabold leading-none tracking-tighter sm:text-[60px] md:flex-row lg:text-[80px]">
          <GradientText
            text="Создавай."
            startColor="#007cf0"
            endColor="#00dfd8"
            color="blue"
          />
          <GradientText
            text="Таблицы."
            startColor="#7928ca"
            endColor="#ff0080"
            color="purple"
          />
          <GradientText
            text="Легко."
            startColor="#ff4d4d"
            endColor="#f9cb28"
            color="orange"
          />
        </div>
        <p className="max-w-[800px] text-center text-lg text-muted-foreground">
          Мощный инструмент для эффективного управления данными. Создавайте и
          управляйте таблицами с легкостью, а также храните свои документы в
          одном месте.
        </p>
      </div>
      <div className="relative z-20 flex w-full flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className={cn(
            buttonVariants({
              size: "xl",
              className: "w-full max-w-[280px] whitespace-nowrap",
            })
          )}
        >
          Перейти к Таблицам
        </Link>
        <div className="relative">
          <GradientButton
            startColor="#007cf0"
            endColor="#00dfd8"
            color="blue"
          />
          <GradientButton
            startColor="#7928ca"
            endColor="#ff0080"
            color="purple"
          />
          <GradientButton
            startColor="#ff4d4d"
            endColor="#f9cb28"
            color="orange"
          />
          <Link
            href="/"
            className={cn(
              buttonVariants({
                size: "xl",
                variant: "outline",
                className:
                  "relative z-0 w-full max-w-[280px] whitespace-nowrap border-transparent bg-background bg-clip-padding backdrop-blur-none transition-colors hover:bg-transparent hover:text-primary-foreground",
              })
            )}
          >
            Ознакомиться с Продуктом
          </Link>
        </div>
      </div>
    </Shell>
  )
}

function TrialPreveiw({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Shell
      className={cn(
        "relative flex flex-col items-center justify-between gap-10 py-16 lg:flex-row lg:py-[120px] lg:pr-32",
        // Before
        "before:absolute before:left-[-6rem] before:top-0 before:h-[1px] before:w-[calc(100%+12rem)] before:bg-border-gradient before:content-['']",
        // After
        "after:absolute after:inset-0 after:z-10 after:bg-preview-flash after:opacity-5 after:content-['']",
        className
      )}
      {...props}
    >
      <div className="relative z-20 flex flex-col items-center gap-5 lg:items-start">
        <div className="flex flex-col items-center gap-1 text-[44px] font-extrabold leading-none tracking-tighter sm:text-[48px] lg:flex-row">
          <GradientText
            text="Создавай."
            startColor="#007cf0"
            endColor="#00dfd8"
            color="blue"
          />
          <GradientText
            text="Таблицы."
            startColor="#7928ca"
            endColor="#ff0080"
            color="purple"
          />
          <GradientText
            text="Легко."
            startColor="#ff4d4d"
            endColor="#f9cb28"
            color="orange"
          />
        </div>
        <p className="text-center text-lg text-muted-foreground lg:text-start">
          {/* Освободите себя от сложностей таблиц: храните и управляйте данными
          удобно. */}
          Мощный инструмент для эффективного управления данными. Создавайте и
          управляйте таблицами с легкостью, а также храните свои документы в
          одном месте.
        </p>
      </div>
      <div className="relative z-20 flex w-full max-w-[250px] flex-col gap-4">
        <Link
          href="/"
          className={cn(
            buttonVariants({
              size: "xl",
              className: "w-full whitespace-nowrap",
            })
          )}
        >
          Перейти к Таблицам
        </Link>
        <div className="relative">
          <GradientButton
            startColor="#007cf0"
            endColor="#00dfd8"
            color="blue"
          />
          <GradientButton
            startColor="#7928ca"
            endColor="#ff0080"
            color="purple"
          />
          <GradientButton
            startColor="#ff4d4d"
            endColor="#f9cb28"
            color="orange"
          />
          <Link
            href="/"
            className={cn(
              buttonVariants({
                size: "xl",
                variant: "outline",
                className:
                  "transition-color relative z-0 w-full whitespace-nowrap border-transparent bg-background bg-clip-padding backdrop-blur-none hover:bg-transparent hover:text-primary-foreground",
              })
            )}
          >
            Ознакомиться с Продуктом
          </Link>
        </div>
      </div>
    </Shell>
  )
}

const gradients = {
  blue: {
    animation: "animated-gradient-text-fade-blue",
    animationReverse: "animated-gradient-text-fade-blue-reverse",
  },
  purple: {
    animation: "animated-gradient-text-fade-purple",
    animationReverse: "animated-gradient-text-fade-purple-reverse",
  },
  orange: {
    animation: "animated-gradient-text-fade-orange",
    animationReverse: "animated-gradient-text-fade-orange-reverse",
  },
}

interface GradientProps {
  startColor: string
  endColor: string
  color: "blue" | "purple" | "orange"
}

interface GradientTextProps extends GradientProps {
  text: string
}

function GradientText({
  startColor,
  endColor,
  text,
  color,
}: GradientTextProps) {
  const gradient = gradients[color]

  return (
    <span className="relative block select-none">
      <span
        className={cn(
          "absolute inset-0 z-0 bg-gradient-to-b from-foreground/80 to-foreground bg-clip-text px-[0.05em] text-transparent",
          gradient.animationReverse
        )}
      >
        {text}
      </span>
      <span
        className={cn(
          "relative z-10 block bg-clip-text px-[0.05em] text-transparent",
          gradient.animation
        )}
        style={{
          backgroundImage: `linear-gradient(90deg, ${startColor}, ${endColor})`,
        }}
      >
        {text}
      </span>
    </span>
  )
}

function GradientButton({ startColor, endColor, color }: GradientProps) {
  const gradient = gradients[color]

  return (
    <span
      aria-hidden="true"
      className={cn("absolute inset-0 -z-20 rounded-xl", gradient.animation)}
      style={{
        backgroundImage: `linear-gradient(165deg, ${startColor}, ${endColor})`,
      }}
    >
      <span
        className="absolute inset-0 -z-10 rounded-xl border-[12px] border-transparent bg-clip-padding blur-[36px]"
        style={{
          backgroundImage: `linear-gradient(165deg, ${startColor}, ${endColor})`,
        }}
      />
    </span>
  )
}

export { TrialPreveiw, HomePreview }
