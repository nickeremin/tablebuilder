import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Table } from "@/shared/types"

interface DashboardTableCardProps {
  table: Table
  mode: "cards" | "entities"
}

function DashboardTableCard({ table, mode }: DashboardTableCardProps) {
  return mode === "cards" ? (
    <Card className="bg-background-100 min-h-[200px]">
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
