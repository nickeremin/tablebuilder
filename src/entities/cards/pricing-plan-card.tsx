import React from "react"
import Link from "next/link"
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { type PricingPlan } from "@/shared/config/site/constants"
import { cn } from "@/shared/lib/utils"

interface PricingPlanCardProps {
  plan: PricingPlan
}

function PricingPlanCard({ plan }: PricingPlanCardProps) {
  const planRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (plan.id === "pro") {
      const ref = planRef.current

      const updateMousePosition = (e: MouseEvent) => {
        if (!ref) return

        const rect = ref.getBoundingClientRect()
        const { left, top, right, bottom } = rect

        const centerX = (right + left) / 2
        const centerY = (top + bottom) / 2

        const { clientX, clientY } = e

        const deltaX = clientX - centerX
        const deltaY = clientY - centerY

        const angle = Math.atan2(deltaY, deltaX)

        ref.style.setProperty(
          "--pricing-gradient-rotation",
          `${angle - Math.PI / 2}rad`
        )
      }

      ref?.addEventListener("mousemove", updateMousePosition)

      return () => {
        ref?.removeEventListener("mousemove", updateMousePosition)
      }
    }
  }, [plan.id])

  return (
    <Card
      ref={planRef}
      className={cn(
        "flex flex-[1_1_300px] flex-col shadow-md",
        plan.id === "pro"
          ? "pro-plan border-transparent"
          : "border-2 bg-background "
      )}
    >
      {plan.id === "pro" ? (
        <div className="absolute -top-6 left-1/2 z-10 -translate-x-1/2 select-none rounded-3xl bg-gradient-to-b from-foreground/80 to-foreground px-[22px] py-[14px] text-background backdrop-blur-sm">
          <p className="text-xs font-bold">Популярное</p>
        </div>
      ) : null}
      <CardHeader>
        <CardTitle className="text-lg">{plan.title}</CardTitle>
        <p className="text-[32px] font-bold">${plan.price}</p>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2">
        <ul className="flex grow flex-col gap-4">
          {plan.items.map((item, i) => (
            <li key={i} className="flex gap-2">
              <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-primary">
                <CheckIcon className="h-[14px] w-[14px] text-background" />
              </div>
              <p className="grow text-sm text-muted-foreground">{item}</p>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex-col">
        <div className="relative w-full">
          {plan.id === "pro" ? (
            <div className="absolute inset-0 rounded-md bg-foreground blur-sm" />
          ) : null}
          <Link
            href={plan.href}
            className={cn(
              "relative z-10 inline-flex h-10 w-full items-center justify-center rounded-md border border-foreground px-3 py-2 text-sm font-medium text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ",
              plan.id === "hobby"
                ? "bg-background text-foreground hover:bg-foreground hover:text-background"
                : "bg-foreground text-background hover:bg-background hover:text-foreground"
            )}
          >
            {plan.label}
            <ArrowRightIcon className="ml-auto h-4 w-4" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PricingPlanCard
