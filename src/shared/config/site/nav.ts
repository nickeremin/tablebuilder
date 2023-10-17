import { NavItem } from "@/shared/types"

export const submenuLinks: NavItem[] = [
  {
    title: "Панель управления",
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
