"use server"

import { and, eq } from "drizzle-orm"
import { v4 as uuidv4 } from "uuid"

import { db } from "@/shared/db"
import { tableRecords, tables } from "@/shared/db/schema"
import { TableColumnData } from "@/shared/types"

export async function addRecord(tableId: string, input: TableColumnData[]) {
  const table = await db.query.tables.findFirst({
    where: eq(tables.id, tableId),
  })

  if (!table) throw new Error("Таблица не найдена.")

  await db.insert(tableRecords).values({
    id: uuidv4(),
    tableId,
    data: input,
  })
}

export async function deleteRecord(input: { id: string; tableId: string }) {
  const tableRecord = await db.query.tableRecords.findFirst({
    where: and(
      eq(tableRecords.id, input.id),
      eq(tableRecords.tableId, input.tableId)
    ),
  })

  if (!tableRecord) throw new Error("Запись не найдена.")

  await db.delete(tableRecords).where(eq(tableRecords.id, input.id))
}
