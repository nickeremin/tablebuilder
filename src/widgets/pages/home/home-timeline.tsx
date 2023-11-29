"use client"

import Image from "next/image"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"

import "react-vertical-timeline-component/style.min.css"

import Link from "next/link"

import { Shell } from "@/shared/components/shells/shell"
import { buttonVariants } from "@/shared/components/ui/button"
import { PageHeading } from "@/shared/components/ui/page-header"
import {
  timelineActions,
  type TimelineAction,
} from "@/shared/config/site/constants"
import { cn } from "@/shared/lib/utils"

interface TimelineCardProps
  extends React.HTMLAttributes<VerticalTimelineElement> {
  action: TimelineAction
}

function TimelineCard({ action, ...props }: TimelineCardProps) {
  return (
    <VerticalTimelineElement
      dateClassName="!hidden"
      contentStyle={{
        background: "hsl(var(--background))",
        border: "1px solid hsl(var(--foreground))",
        padding: "0px",
        borderRadius: "12px",
        boxShadow: "0 3px 0 hsl(var(--foreground))",
        WebkitBoxShadow: "0 3px 0 hsl(var(--foreground))",
      }}
      contentArrowStyle={{
        borderRight: "7px solid  hsl(var(--foreground)/.6)",
      }}
      iconClassName={cn(
        "relative border-[2px] border-foreground/60",
        action.background,
        // Before
        "before:absolute before:rounded-full before:inset-0 before:bg-gradient-to-r before:lg:blur-[40px] before:blur-[20px] before:content-['']"
      )}
      iconStyle={{
        // boxShadow: "0 0 0 4px hsl(var(--foreground))",
        boxShadow: "none",
        WebkitBoxShadow: "none",
      }}
      icon={
        <div className=" flex h-full w-full items-center justify-center overflow-hidden">
          <span className="text-[24px] font-bold text-foreground lg:text-[32px]">
            {action.step}
          </span>
        </div>
      }
      {...props}
    >
      <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-t-xl">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/10 to-transparent dark:from-foreground/20" />
        <Image
          src={action.image}
          alt={action.title}
          className="w-full max-w-[400px] object-contain"
        />
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-center text-xl font-semibold lg:text-start lg:text-3xl">
            {action.title}
          </h3>
          <p className="!mt-0 text-center !text-base !font-normal text-muted-foreground lg:text-start">
            {action.description}
          </p>
        </div>
        <div className="mt-4 flex flex-col">
          <Link
            href={action.href}
            className={cn(
              buttonVariants({
                size: "xl",
                className:
                  "w-full justify-between gap-2 px-4 text-sm lg:text-base",
              })
            )}
          >
            <span className="whitespace-nowrap">{action.label}</span>
            <ArrowRightIcon className="h-5 w-5 shrink-0" />
          </Link>
        </div>
      </div>
    </VerticalTimelineElement>
  )
}

function HomeTimeline() {
  return (
    <Shell id="preview-timeline" className="pb-16 lg:pb-[120px]">
      <div className="mb-12 flex flex-col items-center gap-4 lg:mb-24">
        <PageHeading size="xl" className="text-center font-bold ">
          Управление таблицами еще не было таким простым
        </PageHeading>
        <p className="text-center text-lg text-muted-foreground">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam
          alias voluptates quidem ipsa dicta ea ex, labore tempora fuga saepe at
          magni deserunt aperiam porro iure dolores modi harum quibusdam!
        </p>
      </div>

      {/* Timeline */}
      <div className="-mx-6">
        <VerticalTimeline lineColor="hsl(var(--foreground)/.6)" className="">
          {timelineActions.map((action) => (
            <TimelineCard key={action.title} action={action} />
          ))}
        </VerticalTimeline>
      </div>
    </Shell>
  )
}

export default HomeTimeline
