import { type MainNavItem, type NavItem } from "@/shared/types"

export const submenuLinks: NavItem[] = [
  {
    title: "Таблицы",
    href: "/dashboard",
  },
  {
    title: "Хранилище",
    href: "/storages",
  },
  {
    title: "Настройки",
    href: "/account",
  },
]

export const accountLinks: NavItem[] = [
  {
    title: "Общие",
    href: "/account",
  },
  {
    title: "Команды",
    href: "/account/teams",
  },
  {
    title: "Мои Уведомления",
    href: "/account/notifications",
  },
]

export const footerLinks: MainNavItem[] = [
  {
    title: "Панель управления",
    items: [
      {
        title: "Таблицы",
        href: "/dashboard",
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

export const homeNav: MainNavItem[] = [
  {
    title: "Панель управления",
    items: [
      {
        title: "Таблицы",
        href: "/dashboard",
        description:
          "Создание настраиваемых таблиц и управление данными в них.",
        icon: "table",
        items: [],
      },
      {
        title: "Хранилище",
        description:
          "Хранение, отслеживание и управление файлами пользователя.",
        href: "/storages",
        icon: "storage",
        items: [],
      },
      {
        title: "Настройки",
        description: "Изменение параметров и предпочтений пользователя.",
        href: "/settings",
        icon: "settings",
        items: [],
      },
    ],
  },
  {
    title: "О нас",
    href: "/about",
  },
  {
    title: "Руководства",
    href: "/guides",
  },
  {
    title: "Блог",
    href: "/blog",
  },
  {
    title: "Тарифы",
    href: "/pricing",
  },
]
