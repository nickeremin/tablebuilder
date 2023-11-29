import Link from "next/link"

import { Shell } from "@/shared/components/shells/shell"
import { GradientButton } from "@/shared/components/ui/gradient-button"
import { PageHeading } from "@/shared/components/ui/page-header"
import { cn } from "@/shared/lib/utils"

function HomeTrial() {
  return (
    <div className="relative z-10 flex w-full flex-col overflow-hidden bg-background">
      <Shell
        className={cn(
          "relative flex flex-col items-center justify-between gap-10 py-12 lg:flex-row lg:py-[120px]",
          // Before
          "before:absolute before:left-[-6rem] before:top-0 before:h-[1px] before:w-[calc(100%+12rem)] before:bg-border-gradient before:content-['']",
          // After
          "after:absolute after:inset-0 after:z-10 after:bg-preview-flash after:opacity-5 after:content-['']"
        )}
      >
        <div className="relative z-20 flex flex-col items-center gap-12">
          <div className="flex flex-col gap-4">
            <PageHeading size="xl" className="text-center font-bold">
              Опробуйте возможности нашего продукта
            </PageHeading>
            <p className="text-center text-muted-foreground lg:text-lg">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At sequi
              expedita ipsum porro illo minima omnis laboriosam eveniet, ullam
              et dignissimos dolore quo vel atque aperiam. Aliquid, similique?
              Culpa, minus!
            </p>
          </div>
          <Link href="/guides">
            <GradientButton>Пройти Тур</GradientButton>
          </Link>
        </div>
      </Shell>
    </div>
  )
}

export default HomeTrial
