import Link from "next/link"

import { AspectRatio } from "@/shared/components/ui/aspect-ratio"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { getRandomPatternStyle } from "@/shared/lib/generate-pattern"
import { cn } from "@/shared/lib/utils"
import { Table } from "@/shared/types"

interface TableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  table: Table
}

const TableCard = ({ table, className, ...props }: TableCardProps) => {
  return (
    <Link href={`/dashboard/tables/${table.id}`}>
      <Card className={cn("h-full overflow-hidden", className)} {...props}>
        <AspectRatio ratio={21 / 9}>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
          <div
            className="h-full rounded-t-md border-b"
            style={getRandomPatternStyle(String(table.id))}
          />
        </AspectRatio>
        <CardHeader>
          <CardTitle>{table.name}</CardTitle>
          <CardDescription>{table.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

export default TableCard
