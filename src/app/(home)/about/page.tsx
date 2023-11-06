import * as React from "react"
import Link from "next/link"
import { AccessibilityIcon, GlobeIcon, RocketIcon } from "@radix-ui/react-icons"

import { Icons } from "@/shared/components/icons"
import { Shell } from "@/shared/components/shells/shell"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import { PageHeading } from "@/shared/components/ui/page-header"
import { cn } from "@/shared/lib/utils"

const aboutHighlights = [
  {
    icon: "easy",
    title: "Легко",
    description: "Создание таблиц такое же простое, как одно касание.",
  },
  {
    icon: "globe",
    title: "Доступно",
    description: "Высокая скорость сайта в любой точке мира.",
  },
  {
    icon: "accessible",
    title: "Удобно",
    //description: "Большое внимание к пользовательскому опыту и дизайну.",
    description: "Комфортное использование на любом устройстве.",
  },
] satisfies {
  icon: keyof typeof Icons.about
  title: string
  description: string
}[]

function AboutPage() {
  return (
    <>
      <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center border-b">
        <Shell className="py-6 lg:pt-16">
          <div className="flex flex-col items-center justify-between gap-6">
            <div className="flex flex-col items-center">
              <p className="my-3 text-sm uppercase text-primary-blue">
                Наше предназначение
              </p>
              <PageHeading
                as="h2"
                size="3xl"
                className="max-w-[1000px] text-center font-bold !leading-none"
              >
                Мы даем возможность легко создавать и настраивать таблицы
              </PageHeading>
            </div>
            <p className="max-w-[600px] py-3 text-center text-muted-foreground lg:py-6 lg:text-xl">
              Мы создаем продукты для людей, которые устали от сложности
              управления таблицами.
            </p>
          </div>
        </Shell>
        <Shell className="flex flex-col items-center justify-center px-0 py-6 lg:flex-row lg:py-12">
          {aboutHighlights.map((highlight) => {
            const Icon = Icons.about[highlight.icon]

            return (
              <div
                key={highlight.title}
                className="mb-8 flex  max-w-[340px] flex-1 justify-center px-6 lg:mb-0 lg:px-3"
              >
                <div className="flex gap-6">
                  <div className="mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-background">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{highlight.title}</p>
                    <p className="text-muted-foreground">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </Shell>
      </div>
      <Shell className="py-12 lg:py-16">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-6">
          <div className="flex-1">
            <PageHeading
              as="h2"
              size="lg"
              className="text-center font-extrabold lg:text-start"
            >
              Присоединяйтесь к нам и создавайте будущее Tablebuilder
            </PageHeading>
          </div>
          <div className="lg:ml-12">
            <Link
              href="/about"
              className={cn(
                buttonVariants({
                  size: "lg",
                })
              )}
            >
              Открытые позиции
            </Link>
          </div>
        </div>
      </Shell>
    </>
  )
}

export default AboutPage
