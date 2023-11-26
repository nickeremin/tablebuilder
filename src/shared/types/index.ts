import { type FileWithPath } from "react-dropzone"

import { Icons } from "../components/icons"
import { SelectTable, SelectTableRecord } from "../db/schema"

// Nav types
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

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export type SidebarNavItem = NavItemWithChildren

export type MainNavItem = NavItemWithOptionalChildren

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

// Table data types
export interface TableColumn {
  name: string
  type: "text" | "date" | "integer" | "decimal"
}

export interface TableColumnData extends TableColumn {
  data: string | number | Date | undefined
}

export type Table = SelectTable

export type TableRecord = SelectTableRecord

// Data-Table types
/* eslint-disable */
export interface DataTableSearchableColumn<TData> {
  id: string
  title: string
}

// File types
export type FileWithPreview = FileWithPath & {
  preview: string
}

/* eslint-disable */
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
