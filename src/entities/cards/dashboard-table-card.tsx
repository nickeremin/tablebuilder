import { AspectRatio } from "@/shared/components/ui/aspect-ratio"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { getRandomPatternStyle } from "@/shared/lib/generate-pattern"
import { Table } from "@/shared/types"

interface DashboardTableCardProps {
  table: Table
  mode: "cards" | "entities"
}

function DashboardTableCard({ table, mode }: DashboardTableCardProps) {
  return mode === "cards" ? (
    <Card className="overflow-hidden bg-background-100 shadow-md dark:shadow-none">
      <AspectRatio ratio={21 / 9}>
        <div
          className="h-full rounded-t-xl border-b"
          style={getRandomPatternStyle(String(table.id))}
        />
      </AspectRatio>
      <CardHeader>
        <CardTitle>{table.name}</CardTitle>
        <CardDescription>{table.description}</CardDescription>
      </CardHeader>
    </Card>
  ) : (
    <Card>
      <CardHeader>
        <CardTitle>{table.name} Entity Card</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default DashboardTableCard
