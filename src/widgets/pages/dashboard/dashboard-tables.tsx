"use client"

import * as React from "react"
import Link from "next/link"
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@radix-ui/react-icons"
import { LayoutGridIcon, ListIcon } from "lucide-react"
import { useDebounce } from "usehooks-ts"
import { Drawer } from "vaul"

import { DashboardTableCard } from "@/entities/cards"
import { Icons } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import { cn } from "@/shared/lib/utils"
import { trpc } from "@/app/_trpc/client"

type SwitchButtonType = "cards" | "entities"

function DashboardTables() {
  const { data: tables } = trpc.table.getAllUserTables.useQuery()

  const [value, setValue] = React.useState("")
  const debouncedValue = useDebounce(value, 500)
  const [isFocused, setIsFocused] = React.useState(false)

  // const [filteredTables, setFilteredTables] = React.useState(tables)
  const [isPending] = React.useTransition()

  const [mode, setMode] = React.useState<SwitchButtonType>("cards")

  const [open, setOpen] = React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  // React.useEffect(() => {
  //   startTransition(() => {
  //     const filteredTables = tables?.filter((table) =>
  //       table.name.startsWith(debouncedValue)
  //     )
  //     setFilteredTables(filteredTables)
  //   })
  // }, [debouncedValue])

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      <div className="flex h-12 gap-3">
        {/* Searchbar */}
        <div
          className={cn(
            "bg-background-100 flex flex-1 items-center rounded-xl border transition-all",
            isFocused && "ring-1 ring-ring "
          )}
        >
          <div className="-mr-3 flex h-full flex-col items-center justify-center bg-transparent px-3 text-muted-foreground">
            {isPending ? (
              <Icons.spinner className="h-5 w-5" aria-hidden="true" />
            ) : (
              <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </div>
          <input
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            type="search"
            placeholder="Поиск..."
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={value}
            onChange={handleChange}
            className="h-full flex-1 bg-transparent pl-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none"
          />
        </div>

        {/* Switchbar */}
        <div className="bg-background-100 hidden items-center rounded-xl border p-2 lg:flex">
          <SwitchButton
            onClick={() => setMode("cards")}
            isActive={mode === "cards"}
          >
            <LayoutGridIcon className="h-5 w-5" aria-hidden="true" />
          </SwitchButton>
          <SwitchButton
            onClick={() => setMode("entities")}
            isActive={mode === "entities"}
          >
            <ListIcon className="h-6 w-6" aria-hidden="true" />
          </SwitchButton>

          {/* <button
            className={cn(
              "h- text-muted-foreground transition-colors hover:bg-transparent",
              mode === "cards" && "bg-muted"
            )}
          >
            <DashboardIcon className="h-4 w-4" aria-hidden="true" />
          </button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 text-muted-foreground transition-colors hover:bg-transparent",
              mode === "entities" && "bg-muted"
            )}
          >
            <ListIcon className="h-5 w-5" aria-hidden="true" />
          </Button> */}
        </div>

        {/* Desktop add-new button */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="xl"
              className="hidden w-[140px] justify-between px-4 text-sm lg:inline-flex"
            >
              Добавить...
              <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[140px] rounded-xl p-2">
            <ul className="flex list-none flex-col">
              <li>
                <Link
                  href="/dashboard"
                  className="flex h-10 items-center rounded-md px-2 text-sm transition-colors hover:bg-muted"
                >
                  Таблицу
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="flex h-10 items-center rounded-md px-2 text-sm transition-colors hover:bg-muted"
                >
                  Хранилище
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="flex h-10 items-center rounded-md px-2 text-sm transition-colors hover:bg-muted"
                >
                  Участника
                </Link>
              </li>
            </ul>
          </PopoverContent>
        </Popover>

        {/* Mobile add-new button */}

        <Drawer.Root open={open} onOpenChange={setOpen}>
          <Drawer.Trigger asChild>
            <Button size="icon" className="h-12 w-12 rounded-xl lg:hidden">
              <PlusIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Drawer.Trigger>

          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
            <Drawer.Content className="bg-background-100 fixed inset-x-0 bottom-0 z-50 mt-24 flex flex-col rounded-t-lg border-t p-2 shadow-menu-border">
              <ul className="flex list-none flex-col">
                <li onClick={() => setOpen(false)}>
                  <Link
                    href="/dashboard"
                    className="flex h-12 items-center rounded-md px-2 transition-colors hover:bg-muted"
                  >
                    Таблицу
                  </Link>
                </li>
                <li onClick={() => setOpen(false)}>
                  <Link
                    href="/dashboard"
                    className="flex h-12 items-center rounded-md px-2 transition-colors hover:bg-muted"
                  >
                    Хранилище
                  </Link>
                </li>
                <li onClick={() => setOpen(false)}>
                  <Link
                    href="/dashboard"
                    className="flex h-12 items-center rounded-md px-2 transition-colors hover:bg-muted"
                  >
                    Участника
                  </Link>
                </li>
              </ul>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
      <div
        className={cn(
          "grid gap-6",
          mode === "cards"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        )}
      >
        {tables
          ?.filter((table) => table.name.startsWith(debouncedValue))
          .map((table) => (
            <DashboardTableCard key={table.id} mode={mode} table={table} />
          ))}
      </div>
    </div>
  )
}

interface SwitchButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isActive: boolean
}

function SwitchButton({ isActive, ...props }: SwitchButtonProps) {
  return (
    <button
      className={cn(
        "flex h-8 items-center justify-center rounded-md px-2 text-muted-foreground transition-colors hover:text-foreground",
        isActive && "bg-muted text-foreground"
      )}
      {...props}
    />
  )
}

export default DashboardTables
