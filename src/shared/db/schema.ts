import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm"
import {
  decimal,
  integer,
  json,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

import { TableColumnData, TableColumnDef } from "../types"

// Users
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  emailAddress: text("email_address").notNull(),
  username: text("username"),
  imageUrl: text("image_url"),
})

export const usersRelations = relations(users, ({ many }) => ({
  tables: many(tables),
}))

export type SelectUser = InferSelectModel<typeof users>
export type InsertUser = InferInsertModel<typeof users>

// Table data
export const tables = pgTable("tables", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  columns: json("columns").$type<TableColumnDef[] | null>().default(null),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
})

export type SelectTable = InferSelectModel<typeof tables>
export type InsertTable = InferInsertModel<typeof tables>

export const tablesRelations = relations(tables, ({ one, many }) => ({
  user: one(users, {
    fields: [tables.userId],
    references: [users.id],
  }),
  tableRecords: many(tableRecords),
}))

export const tableRecords = pgTable("table_records", {
  id: text("id").notNull().primaryKey(),
  tableId: text("table_id").notNull(),
  data: json("data").$type<TableColumnData[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

export type SelectTableRecord = InferSelectModel<typeof tableRecords>
export type InsertTableRecord = InferInsertModel<typeof tableRecords>

export const tableRecordsRelations = relations(tableRecords, ({ one }) => ({
  table: one(tables, {
    fields: [tableRecords.tableId],
    references: [tables.id],
  }),
}))
