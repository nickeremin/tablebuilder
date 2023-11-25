import Link from "next/link"

import { buttonVariants } from "@/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { ContactCommunity } from "@/shared/config/site/constants"
import { cn } from "@/shared/lib/utils"

interface ContactProductsCommunityCardProps {
  community: ContactCommunity
}

function ContactProductsCommunityCard({
  community,
}: ContactProductsCommunityCardProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>{community.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <CardDescription>{community.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Link
          href={community.href}
          className={cn(buttonVariants({ size: "xl" }))}
        >
          {community.label}
        </Link>
      </CardFooter>
    </Card>
  )
}

export default ContactProductsCommunityCard
