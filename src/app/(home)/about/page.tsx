import Link from "next/link"

import { HighlightCard } from "@/entities/cards"
import { Shell } from "@/shared/components/shells/shell"
import { buttonVariants } from "@/shared/components/ui/button"
import { PageHeading } from "@/shared/components/ui/page-header"
import { aboutHighlights } from "@/shared/config/site/constants"
import { cn } from "@/shared/lib/utils"

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
              <PageHeading as="h2" size="lg" className="text-center font-bold">
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
          {aboutHighlights.map((highlight, i) => (
            <HighlightCard key={i} highlight={highlight} />
          ))}
        </Shell>
      </div>
      <div className="bg-background">
        <Shell className="py-12 lg:py-16">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-6">
            <div className="flex-1">
              <PageHeading
                as="h2"
                size="md"
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
                    size: "xl",
                  })
                )}
              >
                Открытые Позиции
              </Link>
            </div>
          </div>
        </Shell>
      </div>
    </>
  )
}

export default AboutPage
