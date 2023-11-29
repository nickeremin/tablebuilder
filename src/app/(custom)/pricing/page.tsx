"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon, CaretSortIcon } from "@radix-ui/react-icons"
import { BoxIcon, CheckIcon, HeadphonesIcon } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { Drawer } from "vaul"

import {
  HomeHeader,
  SiteFooter,
  StarsBackground,
  TrialPreveiw,
} from "@/widgets/layout"
import { PricingAddOnCard, PricingPlanCard } from "@/entities/cards"
import { Shell } from "@/shared/components/shells/shell"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import { PageHeading } from "@/shared/components/ui/page-header"
import { Spacer } from "@/shared/components/ui/spacer"
import {
  pricingAddOns,
  pricingPlans,
  pricingQuestions,
} from "@/shared/config/site/constants"
import { cn } from "@/shared/lib/utils"

const generals = [
  {
    title: "Количество таблиц",
    hobby: "3 таблицы",
    pro: "10 таблиц",
    custom: "Неограниченное количество таблиц",
  },
  {
    title: "Количество хранилищ",
    hobby: "3 дополнительных хранилища",
    pro: "10 дополнительных хранилища",
    custom: "Неограниченное количество хранилищ",
  },
  {
    title: "Количество команд",
    hobby: "1 команда",
    pro: "5 команд",
    custom: "Неограниченное количество команд",
  },
  {
    title: "Количество таблиц2",
    hobby: "3 таблицы",
    pro: "10 таблиц",
    custom: "Неограниченное количество таблиц",
  },
  {
    title: "Количество хранилищ2",
    hobby: "3 дополнительных хранилища",
    pro: "10 дополнительных хранилища",
    custom: "Неограниченное количество хранилищ",
  },
  {
    title: "Количество команд2",
    hobby: "1 команда",
    pro: "5 команд",
    custom: "Неограниченное количество команд",
  },
]

function PricingPage() {
  const [plan, setPlan] = React.useState<"hobby" | "pro" | "custom">("hobby")
  const [open, setOpen] = React.useState(false)

  const currentPlan = pricingPlans.find((item) => item.id === plan)

  const { ref, inView, entry } = useInView({
    threshold: 0,
  })

  return (
    <div>
      <div ref={ref} className="relative min-h-screen">
        <HomeHeader />
        <div className="relative mb-20">
          <Shell className="flex flex-col">
            <PageHeading
              size="lg"
              className="mx-auto my-20 max-w-[880px] text-center text-[40px] font-bold leading-tight lg:mb-28 lg:leading-[80px]"
            >
              Найдите тариф для реализации ваших проектов
            </PageHeading>
            <div className="flex flex-wrap gap-4 lg:flex-nowrap">
              {pricingPlans.map((plan, i) => (
                <PricingPlanCard key={i} plan={plan} />
              ))}
            </div>
          </Shell>
          <div className="absolute left-[calc(50%-calc(min(75vw,500px))/2)] top-[calc(68%-calc(min(75vw,500px))/2)] -z-10 h-[min(75vw,500px)] w-[min(75vw,500px)] rounded-[calc(.5*min(75vw,500px))] bg-pricing-flash opacity-75 blur-[calc(.5*min(75vw,500px))]" />
        </div>
        <Shell className="mb-20 lg:mb-[120px]">
          <div className="flex flex-col items-center justify-between gap-6 rounded-lg border bg-background p-6 lg:flex-row lg:gap-4">
            <div>
              <p className="mb-1 text-center text-sm font-semibold lg:text-start">
                Нужен корпоративный масштаб и безопасность?
              </p>
              <p className="text-center text-sm text-muted-foreground lg:text-start">
                Поговорите с нашим отделом продаж о ваших требованиях, узнайте о
                специальных ценах или запросите демонстрацию.
              </p>
            </div>
            <Link
              href="/contact/sales"
              className={cn(
                buttonVariants({
                  size: "md",
                  className: "w-full whitespace-nowrap sm:w-fit",
                })
              )}
            >
              Связаться с Отделом
            </Link>
          </div>
        </Shell>
        <Shell className="pb-20 lg:pb-[120px]">
          <div className="flex flex-col gap-12">
            <PageHeading as="h2" size="md" className="text-center font-bold">
              Настройте свой тариф с помощью дополнений
            </PageHeading>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {pricingAddOns.map((addOn, i) => (
                <PricingAddOnCard key={i} addOn={addOn} />
              ))}
            </div>
          </div>
        </Shell>
        <StarsBackground />
      </div>

      {/* Desktop plan tables */}
      <section className="hidden lg:block">
        <header className="sticky top-[-10px] flex h-28 items-center bg-background shadow-nav-border first-line:z-10">
          <Shell>
            <div className="relative flex flex-col">
              <div className="flex items-center justify-end">
                {pricingPlans.map((plan, i) => (
                  <div key={i} className="mx-3 w-[224px] xl:w-[250px]">
                    <div className="flex flex-col gap-2">
                      <div className="flex">
                        <p
                          className={cn(
                            "origin-bottom-left text-2xl font-semibold transition-transform",
                            entry?.target && !inView && "scale-75"
                          )}
                        >
                          {plan.title}
                        </p>
                      </div>
                      <Button className="justify-between">
                        {plan.label}
                        <ArrowRightIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Shell>
        </header>
        <Spacer size="lg" />
        <Shell className="">
          <div className="flex flex-col">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="sticky top-[40px] z-20 pb-5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border">
                        <BoxIcon className="h-5 w-5" />
                      </div>
                      <p className="text-2xl font-semibold">Общие</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {generals.map((item) => (
                  <tr
                    key={item.title}
                    className="border-b [&_td:last-child]:!border-r-0 [&_td:nth-child(n)]:border-r"
                  >
                    <td className="py-4 text-left">{item.title}</td>
                    <td className="w-[248px] py-4 text-center xl:w-[274px]">
                      {item.hobby}
                    </td>
                    <td className="w-[248px] py-4 text-center xl:w-[274px]">
                      {item.pro}
                    </td>
                    <td className="w-[248px] py-4 text-center xl:w-[274px]">
                      {item.custom}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Spacer size="lg" />

            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="sticky top-[40px] z-20 pb-5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border">
                        <HeadphonesIcon className="h-5 w-5" />
                      </div>
                      <p className="text-2xl font-semibold">Поддержка</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {generals.map((item) => (
                  <tr
                    key={item.title}
                    className="border-b [&_td:last-child]:!border-r-0 [&_td:nth-child(n)]:border-r"
                  >
                    <td className="py-4 text-left">{item.title}</td>
                    <td className="w-[248px] py-4 text-center xl:w-[274px]">
                      {item.hobby}
                    </td>
                    <td className="w-[248px] py-4 text-center xl:w-[274px]">
                      {item.pro}
                    </td>
                    <td className="w-[248px] py-4 text-center xl:w-[274px]">
                      {item.custom}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Shell>
      </section>

      {/* Mobile plan tables */}
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <section className="xl:hidden">
          <header className="sticky top-[-10px] flex h-28 items-center bg-background shadow-nav-border first-line:z-10">
            <Shell>
              <div className="relative flex flex-col">
                <div className="mx-auto w-full max-w-[570px]">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <p
                        className={cn(
                          "origin-bottom-left text-2xl font-semibold transition-transform",
                          entry?.target && !inView && "scale-75"
                        )}
                      >
                        {currentPlan?.title}
                      </p>

                      <div>
                        <Drawer.Trigger asChild>
                          <Button variant="ghost" className="-mr-2 px-2">
                            Сменить План
                            <CaretSortIcon className="ml-2 h-5 w-5" />
                          </Button>
                        </Drawer.Trigger>
                      </div>
                    </div>
                    <div>
                      <Button className="w-full justify-between">
                        {currentPlan?.label}
                        <ArrowRightIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Shell>
          </header>
          <Spacer size="lg" />
          <Shell>
            <div className="flex flex-col">
              <div className="mx-auto w-full max-w-[570px]">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="pb-5">
                        <div className="flex items-center gap-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border">
                            <BoxIcon className="h-5 w-5" />
                          </div>
                          <p className="text-2xl font-semibold">Общие</p>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {generals.map((item) => (
                      <tr
                        key={item.title}
                        className="border-b [&_td:last-child]:!border-r-0 [&_td:nth-child(n)]:border-r"
                      >
                        <td className="py-4 text-left">{item.title}</td>
                        <td className="w-[164px] py-4 text-center xl:w-[274px]">
                          {item[currentPlan!.id]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Spacer size="lg" />

                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="pb-5">
                        <div className="flex items-center gap-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border">
                            <HeadphonesIcon className="h-5 w-5" />
                          </div>
                          <p className="text-2xl font-semibold">Поддержка</p>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {generals.map((item) => (
                      <tr
                        key={item.title}
                        className="border-b [&_td:last-child]:!border-r-0 [&_td:nth-child(n)]:border-r"
                      >
                        <td className="py-4 text-left">{item.title}</td>
                        <td className="w-[164px] py-4 text-center xl:w-[274px]">
                          {item[currentPlan!.id]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Shell>
        </section>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mt-24 flex flex-col rounded-t-lg border-t bg-accent-1 shadow-menu-border">
            <div className="px-8 py-4 [&_button:nth-child(-n+2)]:border-b">
              {pricingPlans.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setPlan(item.id)
                    setOpen(false)
                  }}
                  className="relative flex w-full select-none items-center justify-between py-4"
                >
                  <p className={cn(item.id === plan && "font-semibold")}>
                    {item.title}
                  </p>
                  {item.id === plan && (
                    <CheckIcon strokeWidth={1.5} className="h-5 w-5" />
                  )}
                </button>
              ))}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <Spacer size="lg" />

      <div className="border-t bg-accent-1">
        <Spacer size="md" />
        <Shell>
          <div className="flex flex-col items-center justify-center">
            <PageHeading size="lg" className="font-semibold">
              Частые Вопросы
            </PageHeading>
            <Spacer />
            <Accordion type="single" collapsible className="max-w-[600px]">
              {pricingQuestions.map((question, i) => (
                <AccordionItem key={i} value={question.question}>
                  <AccordionTrigger className="py-5 text-start text-base">
                    {question.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    {question.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Shell>
        <Spacer size="xl" />
      </div>
      <div className="relative z-10 flex w-full flex-col overflow-hidden bg-background">
        <TrialPreveiw />
      </div>
      <SiteFooter />
    </div>
  )
}

export default PricingPage
