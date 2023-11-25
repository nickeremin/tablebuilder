import * as React from "react"
import { StaticImageData } from "next/image"
import Link from "next/link"

import { Icons } from "@/shared/components/icons"

import createAccount from "/public/assets/preview-create-account.png"
import customizeTable from "/public/assets/preview-customize-table.png"
import saveDocs from "/public/assets/preview-save-docs.png"
import productSupport from "/public/assets/product-support.png"
import salesSupport from "/public/assets/sales-support.png"
import testAvatar from "/public/assets/test-avatar.jpg"

// Home
export type Testimonial = {
  image: StaticImageData
  telegram: string
  name: string
  text: string
}

export const testimonials: Testimonial[] = [
  {
    image: testAvatar,
    telegram: "@testtelegram",
    name: "Тестовое Имя",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus nihil officiis labore, non amet saepe libero ducimus fuga blanditiis sit eligendi consequatur suscipit? Adipisci suscipit, animi magnam quo molestias qui!",
  },
  {
    image: testAvatar,
    telegram: "@testtelegram",
    name: "Тестовое Имя",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus nihil officiis labore, non amet saepe libero ducimus fuga blanditiis sit eligendi consequatur suscipit? Adipisci suscipit, animi magnam quo molestias qui!",
  },
  {
    image: testAvatar,
    telegram: "@testtelegram",
    name: "Тестовое Имя",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus nihil officiis labore, non amet saepe libero ducimus fuga blanditiis sit eligendi consequatur suscipit? Adipisci suscipit, animi magnam quo molestias qui!",
  },
  {
    image: testAvatar,
    telegram: "@testtelegram",
    name: "Тестовое Имя",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus nihil officiis labore, non amet saepe libero ducimus fuga blanditiis sit eligendi consequatur suscipit? Adipisci suscipit, animi magnam quo molestias qui!",
  },
  {
    image: testAvatar,
    telegram: "@testtelegram",
    name: "Тестовое Имя",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus nihil officiis labore, non amet saepe libero ducimus fuga blanditiis sit eligendi consequatur suscipit? Adipisci suscipit, animi magnam quo molestias qui!",
  },
  {
    image: testAvatar,
    telegram: "@testtelegram",
    name: "Тестовое Имя",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus nihil officiis labore, non amet saepe libero ducimus fuga blanditiis sit eligendi consequatur suscipit? Adipisci suscipit, animi magnam quo molestias qui!",
  },
  {
    image: testAvatar,
    telegram: "@testtelegram",
    name: "Тестовое Имя",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus nihil officiis labore, non amet saepe libero ducimus fuga blanditiis sit eligendi consequatur suscipit? Adipisci suscipit, animi magnam quo molestias qui!",
  },
  {
    image: testAvatar,
    telegram: "@testtelegram",
    name: "Тестовое Имя",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus nihil officiis labore, non amet saepe libero ducimus fuga blanditiis sit eligendi consequatur suscipit? Adipisci suscipit, animi magnam quo molestias qui!",
  },
  {
    image: testAvatar,
    telegram: "@testtelegram",
    name: "Тестовое Имя",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus nihil officiis labore, non amet saepe libero ducimus fuga blanditiis sit eligendi consequatur suscipit? Adipisci suscipit, animi magnam quo molestias qui!",
  },
  {
    image: testAvatar,
    telegram: "@testtelegram",
    name: "Тестовое Имя",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus nihil officiis labore, non amet saepe libero ducimus fuga blanditiis sit eligendi consequatur suscipit? Adipisci suscipit, animi magnam quo molestias qui!",
  },
  {
    image: testAvatar,
    telegram: "@testtelegram",
    name: "Тестовое Имя",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus nihil officiis labore, non amet saepe libero ducimus fuga blanditiis sit eligendi consequatur suscipit? Adipisci suscipit, animi magnam quo molestias qui!",
  },
  {
    image: testAvatar,
    telegram: "@testtelegram",
    name: "Тестовое Имя",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus nihil officiis labore, non amet saepe libero ducimus fuga blanditiis sit eligendi consequatur suscipit? Adipisci suscipit, animi magnam quo molestias qui!",
  },
  {
    image: testAvatar,
    telegram: "@testtelegram",
    name: "Последнее Имя",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus nihil officiis labore, non amet saepe libero ducimus fuga blanditiis sit eligendi consequatur suscipit? Adipisci suscipit, animi magnam quo molestias qui!",
  },
]

export type TimelineAction = {
  image: StaticImageData
  step: number
  background: string
  title: string
  description: string
  href: string
  label: string
}

export const timelineActions: TimelineAction[] = [
  {
    image: createAccount,
    step: 1,
    background:
      "bg-gradient-to-r before:bg-gradient-to-r from-blue-start before:from-blue-start to-blue-end before:to-blue-end",
    title: "Создайте Аккаунт",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam alias voluptates quidem ipsa dicta ea ex, labore tempora fuga saepe at magni deserunt aperiam porro iure dolores modi harum quibusdam!",
    href: "/signup",
    label: "Создать Аккаунт",
  },
  {
    image: customizeTable,
    step: 2,
    background:
      "bg-gradient-to-r before:bg-gradient-to-r from-purple-start before:from-purple-start to-purple-end before:to-purple-end",
    title: "Настройте Таблицу",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam alias voluptates quidem ipsa dicta ea ex, labore tempora fuga saepe at magni deserunt aperiam porro iure dolores modi harum quibusdam!",
    href: "/dashboard",
    label: "Перейти к Таблицам",
  },
  {
    image: saveDocs,
    step: 3,
    background:
      "bg-gradient-to-r before:bg-gradient-to-r from-orange-start before:from-orange-start to-orange-end before:to-orange-end",
    title: "Сохраняйте Документы",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam alias voluptates quidem ipsa dicta ea ex, labore tempora fuga saepe at magni deserunt aperiam porro iure dolores modi harum quibusdam!",
    href: "/dashboard/storages",
    label: "Перейти в Хранилище",
  },
]

// About
export type AboutHighlight = {
  icon: keyof typeof Icons.about
  title: string
  description: string
}

export const aboutHighlights: AboutHighlight[] = [
  {
    icon: "easy",
    title: "Легко",
    description: "Создание таблиц такое же простое, как одно касание.",
  },
  {
    icon: "globe",
    title: "Доступно",
    description: "Высокая скорость сайта в любой точке мира.",
  },
  {
    icon: "accessible",
    title: "Удобно",
    description: "Комфортное использование на любом устройстве.",
  },
]

// Pricing
export type PricingPlan = {
  id: "hobby" | "pro" | "custom"
  title: string
  price: number | "custom"
  description: string
  items: string[]
  href: string
  label: string
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "hobby",
    title: "Хобби",
    price: 0,
    description: "Опробуйте бесплатный тариф.",
    items: [
      "Создайте до 3 таблиц.",

      "Получите 3 бесплатных хранилища.",

      "Имеете возможность создать 1 команду.",

      "Создайте до 3 таблиц.",

      "Получите 3 бесплатных хранилища.",

      "Имеете возможность создать 1 команду.",

      "Создайте до 3 таблиц.",

      "Получите 3 бесплатных хранилища.",

      "Имеете возможность создать 1 команду.",
    ],
    href: "/",
    label: "Продолжить с Хобби",
  },
  {
    id: "pro",
    title: "Про",
    price: 0,
    description: "Опробуйте бесплатный тариф.",
    items: [
      "Создайте до 3 таблиц.",

      "Получите 3 бесплатных хранилища.",

      "Имеете возможность создать 1 команду.",
    ],
    href: "/",
    label: "Опробовать Бесплатно",
  },
  {
    id: "custom",
    title: "Сотрудничество",
    price: 0,
    description: "Опробуйте бесплатный тариф.",
    items: [
      "Создайте до 3 таблиц.",

      "Получите 3 бесплатных хранилища.",

      "Имеете возможность создать 1 команду.",
    ],
    href: "/",
    label: "Связаться с Отделом",
  },
]

export type PricingAddOn = {
  icon: keyof typeof Icons.pricing
  title: string
  price: number
  description: string
}

export const pricingAddOns: PricingAddOn[] = [
  {
    icon: "check",
    price: 150,
    title: "Первый итем",
    description: "Описание первого итема. Можно что то сделать.",
  },
  {
    icon: "check",
    price: 10,
    title: "Второй итем",
    description: "Описание второго итема. Можно что то еще.",
  },
  {
    icon: "check",
    price: 50,
    title: "Третий итем",
    description: "Описание третьего итема. Можно что то ага.",
  },
  {
    icon: "check",
    price: 100,
    title: "Четвертый итем",
    description: "Описание четвертого итема. Можно что то да.",
  },
]

export type PricingQuestion = {
  question: string
  answer: string
}

export const pricingQuestions: PricingQuestion[] = [
  {
    question: "Первый вопрос",
    answer: "Первый ответ",
  },
  {
    question: "Второй вопрос",
    answer: "Первый ответ",
  },
  {
    question:
      "Третий очень длинный вопрос на проверку того сколько строк макисмум это может занять и как это будет отображаться на разнрых девайсах вопрос",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat delectus accusamus facilis alias aspernatur qui. Eaque ut saepe at, ad ipsum sint provident optio, quis, iste nam quos consequuntur voluptates.",
  },
  {
    question: "Первый вопрос Первый вопрос Первый вопрос Первый вопрос",
    answer: "Первый ответ",
  },
  {
    question: "Второй вопрос Второй вопрос Второй вопрос Второй вопрос",
    answer: "Первый ответ",
  },
  {
    question:
      "Третий очень длинный вопрос на проверку того сколько строк макисмум это может занять и как это будет отображаться на разнрых девайсах вопрос fuf",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat delectus accusamus facilis alias aspernatur qui. Eaque ut saepe at, ad ipsum sint provident optio, quis, iste nam quos consequuntur voluptates.",
  },
]

// Contact
export type ContactSupport = {
  image: StaticImageData
  title: string
  description: string
  href: string
  label: string
}

export const contactSupports: ContactSupport[] = [
  {
    image: productSupport,
    title: "Поддержка продукции",
    description:
      "Обратитесь за помощью к сообществу или отправьте заявку в нашу службу поддержки.",
    href: "/contact/products",
    label: "Получить Поддержку",
  },
  {
    image: salesSupport,
    title: "Отдел продаж",
    description:
      "Поговорите с нашим отделом продаж о ваших требованиях или узнайте подробности.",
    href: "/contact/sales",
    label: "Связаться с Отделом",
  },
]

export type ContactAction = {
  icon: React.ReactNode
  title: string
  description: React.ReactNode
}

export const contactActions: ContactAction[] = [
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
]

export type ContactCommunity = {
  title: string
  description: string
  href: string
  label: React.ReactNode
}

export const contactCommunities: ContactCommunity[] = [
  {
    title: "Title",
    description: "Description",
    href: "/contact/products#community",
    label: "Label",
  },
]
