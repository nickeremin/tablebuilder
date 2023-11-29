import { TrialPreveiw } from "@/widgets/layout"
import { ContactActionCard, ContactSupportCard } from "@/entities/cards"
import { Shell } from "@/shared/components/shells/shell"
import { PageHeading } from "@/shared/components/ui/page-header"
import { contactActions, contactSupports } from "@/shared/config/site/constants"
import { cn } from "@/shared/lib/utils"

function ContactPage() {
  return (
    <>
      <Shell className="relative flex flex-col gap-12 overflow-hidden pb-24 pt-12 lg:gap-16 lg:pt-16">
        <PageHeading size="lg" className="mx-auto text-center font-bold">
          Связаться с Нами
        </PageHeading>
        {/* Card with product and sales support */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-stretch">
          {contactSupports.map((contact, i) => (
            <ContactSupportCard key={i} contact={contact} />
          ))}
        </div>
        <div className="absolute bottom-0 left-1/2 -z-10 h-[320px] w-[950px] -translate-x-1/2 translate-y-1/2 rounded-[50%] bg-accent-1 blur-[100px]" />
      </Shell>
      <div className="bg-background py-6">
        <Shell className="flex flex-col py-12 lg:flex-row">
          {contactActions.map((action, i) => (
            <ContactActionCard
              key={i}
              action={action}
              className={cn(
                i < contactActions.length - 1 &&
                  "mb-8 border-b pb-8 lg:mb-0 lg:mr-12 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12"
              )}
            />
          ))}
        </Shell>
      </div>
      <div className="relative z-10 flex w-full flex-col overflow-hidden bg-background">
        <TrialPreveiw />
      </div>
    </>
  )
}

export default ContactPage
