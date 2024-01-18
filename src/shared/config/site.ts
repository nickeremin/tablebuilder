import { type NavItemWithOptionalChildren } from "../types"

export const footerLinks: NavItemWithOptionalChildren[] = [
  {
    title: "Панель управления",
    items: [
      {
        title: "Таблицы",
        href: "/tables",
        items: [],
      },
      {
        title: "Хранилище",
        href: "/storages",
        items: [],
      },
      {
        title: "Настройки",
        href: "/account",
        items: [],
      },
    ],
  },
  {
    title: "Ресурсы",
    items: [
      {
        title: "Блог",
        href: "/blog",
        items: [],
      },
      {
        title: "Руководства",
        href: "/guides",
        items: [],
      },
      {
        title: "Помощь",
        href: "/help",
        items: [],
      },
      {
        title: "Тарифы",
        href: "/pricing",
        items: [],
      },
    ],
  },
  {
    title: "Компания",
    items: [
      {
        title: "О нас",
        href: "/about",
        items: [],
      },
      {
        title: "Связаться с нами",
        href: "/contact",
        items: [],
      },
      {
        title: "Политика конфиденциальности",
        href: "/legal/privacy-policy",
        items: [],
      },
      {
        title: "Условия использования",
        href: "/legal/terms",
        items: [],
      },
    ],
  },
]
