import * as React from "react"
import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { TablesPreview } from "@/widgets/layout/home"
import { Icons } from "@/shared/components/icons"
import LogoIcon from "@/shared/components/logo"
import { Shell } from "@/shared/components/shells/shell"
import { buttonVariants } from "@/shared/components/ui/button"
import { Card, CardHeader } from "@/shared/components/ui/card"
import { PageHeading } from "@/shared/components/ui/page-header"
import { Separator } from "@/shared/components/ui/separator"
import { cn } from "@/shared/lib/utils"

import productSupport from "/public/assets/product-support.png"
import salesSupport from "/public/assets/sales-support.png"

const contactCards = [
  {
    imgSrc: productSupport,
    title: "Поддержка продукции",
    description:
      "Обратитесь за помощью к сообществу или отправьте заявку в нашу службу поддержки.",
    btnText: "Получить поддержку",
    href: "/contact/products",
  },
  {
    imgSrc: salesSupport,
    title: "Отдел продаж",
    description:
      "Поговорите с нашим отделом продаж о ваших требованиях или узнайте подробности.",
    btnText: "Связаться с отделом",
    href: "/contact/sales",
  },
] satisfies {
  imgSrc: StaticImageData
  title: string
  description: string
  btnText: string
  href: string
}[]

const contactActions = [
  {
    icon: <Icons.logo className="h-6 w-6" />,
    title: "Воспользуйтесь поддержкой нашего Эксперта",
    description: (
      <>
        Наши тарифы предоставляют доступ к экспертной поддержке. Если у вас есть{" "}
        <Link
          href="/pricing"
          className="text-link hover:underline hover:underline-offset-4"
        >
          платный тариф
        </Link>
        , вы можете воспользоваться помощью эксперта.
      </>
    ),
  },
  {
    icon: <Icons.gitHub className="h-8 w-8" />,
    title: "Присоединяйтесь к нашему сообществу",
    description: (
      <>
        Для получения информации, связанной с кодом, присоединяйтесь к нашему{" "}
        <Link
          href="/contact"
          className="text-link hover:underline hover:underline-offset-4"
        >
          каналу обсуждений на GitHub.
        </Link>
      </>
    ),
  },
  {
    icon: <Icons.telegram className="h-6 w-6" />,
    title: "Cледите за нами в Telegram",
    description: (
      <>
        Получайте новости Tablebuilder, информацию о компании и медиа-ресурсы на{" "}
        <Link
          href="/contact"
          className="text-link hover:underline hover:underline-offset-4"
        >
          @tablebuilder.
        </Link>
      </>
    ),
  },
] satisfies {
  icon: React.JSX.Element
  title: string
  description: React.ReactNode
}[]

function ContactPage() {
  return (
    <>
      <Shell className="flex flex-col gap-12 pb-24 pt-16 lg:gap-16">
        <PageHeading
          size="3xl"
          className="mx-auto text-center text-[36px] font-bold"
        >
          Связаться с Нами
        </PageHeading>
        {/* Card with product and sales support */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-stretch">
          {contactCards.map((card) => (
            <Card key={card.title} className="max-w-xl flex-1 overflow-hidden">
              <div className="relative flex justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/30 dark:to-white/30" />
                <Image
                  src={card.imgSrc}
                  width={413}
                  height={275}
                  alt={card.title}
                />
              </div>
              <CardHeader className="gap-8 lg:flex-row lg:items-end">
                <div className="flex flex-col gap-3">
                  <h2 className="text-base font-bold lg:text-xl">
                    {card.title}
                  </h2>
                  <p className="text-sm text-muted-foreground lg:text-base">
                    {card.description}
                  </p>
                </div>
                <Link
                  href={card.href}
                  className={cn(
                    buttonVariants({
                      className: "h-10 whitespace-nowrap",
                    })
                  )}
                >
                  {card.btnText}
                </Link>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Shell>
      <div className="border-b bg-accent/25 py-6 dark:bg-accent/10">
        <Shell className="flex flex-col py-12 lg:flex-row">
          {contactActions.map((action, i) => (
            <div
              className={cn(
                i < contactActions.length - 1 &&
                  "mb-8 border-b pb-8 lg:mb-0 lg:mr-12 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12"
              )}
            >
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
          ))}
        </Shell>
      </div>
      <Shell className="py-16 lg:py-[120px] lg:pr-32">
        <TablesPreview />
      </Shell>
    </>
  )
}

export default ContactPage
