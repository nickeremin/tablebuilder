import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@/shared/components/ui/button"
import { Card, CardHeader } from "@/shared/components/ui/card"
import { type ContactSupport } from "@/shared/config/site/constants"
import { cn } from "@/shared/lib/utils"

interface ContactSupportCardProps {
  contact: ContactSupport
}

function ContactSupportCard({ contact }: ContactSupportCardProps) {
  return (
    <Card
      key={contact.title}
      className="max-w-xl flex-1 overflow-hidden border-foreground/50 shadow-bottom-border"
    >
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-foreground/10 dark:to-foreground/20" />
        <Image
          src={contact.image}
          width={413}
          height={275}
          alt={contact.title}
        />
      </div>
      <CardHeader className="gap-8 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-bold lg:text-xl">{contact.title}</h2>
          <p className="text-sm text-muted-foreground lg:text-base">
            {contact.description}
          </p>
        </div>
        <Link
          href={contact.href}
          className={cn(
            buttonVariants({
              className: "h-10 whitespace-nowrap",
            })
          )}
        >
          {contact.label}
        </Link>
      </CardHeader>
    </Card>
  )
}

export default ContactSupportCard
