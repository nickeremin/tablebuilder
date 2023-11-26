import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm"
import {
  boolean,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

import { TableColumn, TableColumnData } from "../types"

// Users
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  imageUrl: text("image_url"),
  email: text("email").notNull(),
  username: text("username").notNull(),
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
  description: text("description"),
  columns: json("columns").$type<TableColumn[]>().notNull(),
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

export const notificationPreferencesEnum = pgEnum(
  "notification_preferences_type",
  ["web", "email"]
)

export const notificationPreferences = pgTable("notification_prefernces", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id").notNull(),
  type: notificationPreferencesEnum("type").notNull(),
  tableFailures: boolean("table_failures").notNull().default(true),
  newUpdates: boolean("new_updates").notNull().default(true),
  subscriptionExpiration: boolean("subscription_expiration")
    .notNull()
    .default(true),
  teamTableChanges: boolean("team_table_changes").notNull().default(true),
  teamJoinRequests: boolean("team_join_requests").notNull().default(true),
  warnings: boolean("warnings").notNull().default(true),
})
