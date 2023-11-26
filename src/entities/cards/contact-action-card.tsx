import Balancer from "react-wrap-balancer"

import { type ContactAction } from "@/shared/config/site/constants"

interface ContactActionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  action: ContactAction
}

function ContactActionCard({
  action,
  className,
  ...props
}: ContactActionCardProps) {
  return (
    <div className={className} {...props}>
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border lg:mx-0">
        {action.icon}
      </div>
      <div>
        <h3 className="mb-1 text-center text-[24px] font-semibold leading-tight tracking-tight lg:text-start">
          <Balancer>{action.title}</Balancer>
        </h3>
        <p className="text-center text-base text-muted-foreground lg:text-start">
          {action.description}
        </p>
      </div>
    </div>
  )
}

export default ContactActionCard
