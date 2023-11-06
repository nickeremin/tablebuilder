import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons"

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
import { cn } from "@/shared/lib/utils"

const pricingPlans = [
  {
    title: "Хобби",
    price: 0,
    description: "Опробуйте бесплатный тариф.",
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
    title: "Хобби",
    price: 0,
    description: "Опробуйте бесплатный тариф.",
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
    title: "Хобби",
    price: 0,
    description: "Опробуйте бесплатный тариф.",
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

function PricingPage() {
  return (
    <>
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
                    {plan.features.map((item) => (
                      <li key={item.label} className="flex gap-2">
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
                      <CardDescription>${addon.price} / месяц</CardDescription>
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
      <section>
        <header className="sticky -top-[10px] z-10 h-28 bg-background pt-4 shadow-nav-border">
          <Shell>
            <div className="relative flex flex-col">
              <div className="flex items-center justify-end">
                <div className="mx-3 w-[250px]">
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold">Хобби</p>
                    <Button className="justify-between">
                      Продолжить с Хобби
                      <ArrowRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mx-3 w-[250px]">
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold">Про</p>
                    <Button className="justify-between">
                      Попробывать бесплатно
                      <ArrowRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mx-3 w-[250px]">
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold">Сотрудничество</p>
                    <Button className="justify-between">
                      Связаться с отделом
                      <ArrowRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Shell>
        </header>
        <Spacer className="mt-[71px]" />
        <div className="h-[1000px]"></div>
      </section>
    </>
  )
}

export default PricingPage
