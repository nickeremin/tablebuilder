import { Icons } from "@/shared/components/icons"
import { type AboutHighlight } from "@/shared/config/site/constants"

interface HighlightCardProps {
  highlight: AboutHighlight
}

function HighlightCard({ highlight }: HighlightCardProps) {
  const Icon = Icons[highlight.icon]

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
          <p className="text-muted-foreground">{highlight.description}</p>
        </div>
      </div>
    </div>
  )
}

export default HighlightCard
