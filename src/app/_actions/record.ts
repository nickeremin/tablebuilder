"use server"

import { eq } from "drizzle-orm"
import { v4 as uuidv4 } from "uuid"
import * as z from "zod"

import { Prettify } from "@/shared/types/helpers"
import { db } from "@/shared/db"
import { tableRecords, tables } from "@/shared/db/schema"
import { tableRecordSchema } from "@/shared/lib/validations/table-record"
import { TableColumnData } from "@/shared/types"

export async function addRecord(tableId: string, input: TableColumnData[]) {
  await db.insert(tableRecords).values({
    id: uuidv4(),
    tableId,
    data: input,
  })
}
