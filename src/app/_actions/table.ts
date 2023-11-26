"use server"

import { and, eq } from "drizzle-orm"
import { v4 as uuidv4 } from "uuid"
import * as z from "zod"

import { db } from "@/shared/db"
import { tables } from "@/shared/db/schema"
import { tableSchema } from "@/shared/lib/validations/table"

export async function getAllTables(userId: string) {
  return await db.query.tables.findMany({
    where: eq(tables.userId, userId),
  })
}

export const getTableById = async (tableId: string, userId: string) => {
  return await db.query.tables.findFirst({
    where: and(eq(tables.id, tableId), eq(tables.userId, userId)),
    with: {
      tableRecords: true,
    },
  })
}

// export const filterTables = async (query: string) => {
//   const filteredTables = await db
//     .select({
//       id: tables.id,
//       name: tables.name,
//       type: tables.type,
//     })
//     .from(tables)
//     .where(ilike(tables.name, `%${query}%`))
//     .orderBy(desc(tables.createdAt))
//     .limit(20)

//   const tablesByType = Array.from(
//     new Set(filteredTables.map((table) => table.type))
//   ).map((type) => ({
//     type,
//     tables: filteredTables.filter((table) => table.type === type),
//   }))

//   return tablesByType
// }

// TODO

export const createTable = async (
  userId: string,
  input: z.infer<typeof tableSchema>
) => {
  await db.insert(tables).values({
    id: uuidv4(),
    userId,
    ...input,
  })
}
