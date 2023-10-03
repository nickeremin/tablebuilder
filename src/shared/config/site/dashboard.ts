import { type SidebarNavItem } from "@/shared/types"

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Аккаунт",
      href: "/dashboard/account",
      icon: "user",
      items: [],
    },
    {
      title: "Таблицы",
      href: "/dashboard/tables",
      icon: "table",
      items: [],
    },
  ],
}
