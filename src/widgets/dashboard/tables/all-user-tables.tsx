"use client"

import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation"

import { TableCard } from "@/entities/cards/table"
import { trpc } from "@/app/_trpc/client"

const AllUserTables = () => {
  const { data: tables } = trpc.table.getAllUserTables.useQuery(
    void undefined,
    {
      suspense: true,
    }
  )

  if (!tables) return null

  const searchParams = useSearchParams() as ReadonlyURLSearchParams
  const tableTypes = searchParams.get("tableTypes")

  return (
    <>
      {tables.map((table) => (
        <TableCard
          key={table.id}
          table={table}
          className="transition-all hover:-translate-y-4"
        />
      ))}
      {/* {!tableTypes
        ? tables.map((table) => (
            <TableCard
              key={table.id}
              table={table}
              className="transition-all hover:-translate-y-4"
            />
          ))
        : tables
            .filter((table) =>
              tableTypes
                .split(".")
                .find((tableType) => tableType === table.type)
            )
            .map((table) => (
              <TableCard
                key={table.id}
                table={table}
                className="transition-all hover:-translate-y-4"
              />
            ))} */}
    </>
  )
}

export default AllUserTables
