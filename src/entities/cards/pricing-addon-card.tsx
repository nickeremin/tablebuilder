import { Icons } from "@/shared/components/icons"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { type PricingAddOn } from "@/shared/config/site/constants"

interface PricingAddOnCardProps {
  addOn: PricingAddOn
}

function PricingAddOnCard({ addOn }: PricingAddOnCardProps) {
  const Icon = Icons[addOn.icon]

  return (
    <Card>
      {/* Card on mobile screens */}
      <CardHeader className="flex items-center lg:hidden lg:flex-row">
        <CardDescription>${addOn.price} / месяц</CardDescription>
        <div className="flex h-14 w-14 items-center justify-center rounded-lg border">
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle>{addOn.title}</CardTitle>
        <CardDescription className="text-center">
          {addOn.description}
        </CardDescription>
      </CardHeader>

      {/* Card on Desktop screens */}
      <CardHeader className="hidden items-center gap-6 lg:flex lg:flex-row">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg border">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex flex-col gap-4">
          <CardDescription>${addOn.price} / месяц</CardDescription>
          <div className="flex flex-col gap-1">
            <CardTitle>{addOn.title}</CardTitle>
            <CardDescription className="text-center">
              {addOn.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default PricingAddOnCard
