"use client"

import React from "react"
import Link from "next/link"
import { ArrowRightIcon, CheckIcon, LayersIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { useInView } from "react-intersection-observer"

import { HomeNav, SiteFooter } from "@/widgets/layout/home"
import { Icons } from "@/shared/components/icons"
import { Shell } from "@/shared/components/shells/shell"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { PageHeading } from "@/shared/components/ui/page-header"
import { Spacer } from "@/shared/components/ui/spacer"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "@/shared/components/ui/table"
import { cn } from "@/shared/lib/utils"

const pricingPlans = [
  {
    title: "Хобби",
    price: 0,
    description: "Опробуйте бесплатный тариф.",
    btnText: "Продолжить с Хобби",
    features: [
      {
        label: "Создайте до 3 таблиц.",
      },
      {
        label: "Получите 3 бесплатных хранилища.",
      },
      {
        label: "Имеете возможность создать 1 команду.",
      },
      {
        label: "Создайте до 3 таблиц.",
      },
      {
        label: "Получите 3 бесплатных хранилища.",
      },
      {
        label: "Имеете возможность создать 1 команду.",
      },
      {
        label: "Создайте до 3 таблиц.",
      },
      {
        label: "Получите 3 бесплатных хранилища.",
      },
      {
        label: "Имеете возможность создать 1 команду.",
      },
    ],
  },
  {
    title: "Про",
    price: 0,
    description: "Опробуйте бесплатный тариф.",
    btnText: "Опробовать бесплатно",
    features: [
      {
        label: "Создайте до 3 таблиц.",
      },
      {
        label: "Получите 3 бесплатных хранилища.",
      },
      {
        label: "Имеете возможность создать 1 команду.",
      },
    ],
  },
  {
    title: "Сотрудничество",
    price: 0,
    description: "Опробуйте бесплатный тариф.",
    btnText: "Связаться с отделом",
    features: [
      {
        label: "Создайте до 3 таблиц.",
      },
      {
        label: "Получите 3 бесплатных хранилища.",
      },
      {
        label: "Имеете возможность создать 1 команду.",
      },
    ],
  },
] satisfies {
  title: string
  price: number | "custom"
  description: string
  btnText: string
  features: {
    label: string
  }[]
}[]

const pricingAddOns = [
  {
    image: "check",
    price: 150,
    title: "Первый итем",
    description: "Описание первого итема. Можно что то сделать.",
  },
  {
    image: "check",
    price: 10,
    title: "Второй итем",
    description: "Описание второго итема. Можно что то еще.",
  },
  {
    image: "check",
    price: 50,
    title: "Третий итем",
    description: "Описание третьего итема. Можно что то ага.",
  },
  {
    image: "check",
    price: 100,
    title: "Четвертый итем",
    description: "Описание четвертого итема. Можно что то да.",
  },
] satisfies {
  image: keyof typeof Icons
  price: number
  title: string
  description: string
}[]

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
]

function PricingPage() {
  const { ref, inView, entry } = useInView({
    threshold: 0,
  })

  return (
    <div>
      <div ref={ref} className="relative min-h-screen">
        <HomeNav />
        <div className="relative mb-20">
          <Shell className="flex flex-col">
            <PageHeading
              size="3xl"
              className="mx-auto my-20 max-w-[880px] text-center font-bold lg:mb-28"
            >
              Выберите тариф для реализации ваших проектов
            </PageHeading>
            <div className="flex flex-wrap gap-4 lg:flex-nowrap">
              {pricingPlans.map((plan, i) => (
                <Card
                  key={i}
                  className="flex flex-[1_1_300px] flex-col shadow-md"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{plan.title}</CardTitle>
                    <p className="text-[32px] font-bold">${plan.price}</p>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-2">
                    <ul className="flex grow flex-col gap-4">
                      {plan.features.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-primary">
                            <CheckIcon className="h-[14px] w-[14px] text-background" />
                          </div>
                          <p className="grow text-sm text-muted-foreground">
                            {item.label}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex-col">
                    <Button variant="outline" className="h-10 w-full">
                      Перейти к таблицам
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </Shell>
        </div>
        <Shell className="mb-20 lg:mb-[120px]">
          <div className="flex flex-col items-center justify-between gap-6 rounded-lg border p-6 lg:flex-row lg:gap-4">
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
              Связаться с отделом
            </Link>
          </div>
        </Shell>
        <Shell className="mb-20 lg:mb-[120px]">
          <div className="flex flex-col gap-12">
            <PageHeading as="h2" size="lg" className="text-center font-bold">
              Настройте свой тариф с помощью дополнений
            </PageHeading>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {pricingAddOns.map((addon) => {
                const Icon = Icons[addon.image]

                return (
                  <Card key={addon.title}>
                    {/* Card on mobile screens */}
                    <CardHeader className="flex items-center lg:hidden lg:flex-row">
                      <CardDescription>${addon.price} / месяц</CardDescription>
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg border">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle>{addon.title}</CardTitle>
                      <CardDescription className="text-center">
                        {addon.description}
                      </CardDescription>
                    </CardHeader>

                    {/* Card on Desktop screens */}
                    <CardHeader className="hidden items-center gap-6 lg:flex lg:flex-row">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg border">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col gap-4">
                        <CardDescription>
                          ${addon.price} / месяц
                        </CardDescription>
                        <div className="flex flex-col gap-1">
                          <CardTitle>{addon.title}</CardTitle>
                          <CardDescription className="text-center">
                            {addon.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </Shell>
      </div>
      <section>
        <header className="sticky top-[-10px] z-10 flex h-28 items-center bg-background/75 shadow-nav-border">
          <Shell>
            <div className="relative flex flex-col">
              <div className="flex items-center justify-end">
                {pricingPlans.map((plan) => (
                  <div key={plan.title} className="mx-3 w-[250px]">
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
                        {plan.btnText}
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
            <div className="">
              <div className="sticky top-[40px] z-20 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-muted">
                    <LayersIcon className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-semibold">Общие</p>
                </div>
              </div>
              <div className="h-[500px] bg-red-200"></div>
            </div>

            <Spacer size="lg" />

            <div className="">
              <div className="sticky top-[40px] z-20 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-muted">
                    <LayersIcon className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-semibold">Поддержка</p>
                </div>
              </div>
              <div className="h-[500px] bg-green-200"></div>
            </div>
            {/* <Table className="">
              <thead>
                <tr>
                  <th className="sticky top-[40px] z-20 p-[1px] px-0 pb-4 text-primary">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-muted">
                        <LayersIcon className="h-5 w-5" />
                      </div>
                      <p className="text-2xl font-semibold">Общие</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <div className="h-[1000px]"></div>
              <TableBody>
                {generals.map((item) => (
                  <TableRow key={item.title}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="w-[274px]">{item.hobby}</TableCell>
                    <TableCell className="w-[274px]">{item.pro}</TableCell>
                    <TableCell className="w-[274px]">{item.custom}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> */}
            <div className="h-[700px]"></div>
          </div>
        </Shell>
      </section>
      <SiteFooter />
    </div>
  )
}

export default PricingPage
