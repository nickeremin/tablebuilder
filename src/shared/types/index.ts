import { Icons } from "../components/icons"
import { SelectTable, SelectTableRecord } from "../db/schema"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export type SidebarNavItem = NavItemWithChildren

// Table data types
export interface TableColumnDef {
  name: string
  type: "text" | "date" | "integer" | "decimal"
  number: number
}

export interface TableColumnData {
  number: number
  data: string | number | Date | undefined
}

export type Table = SelectTable

export type TableRecord = SelectTableRecord

// export type TRecord = SelectRecord

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
