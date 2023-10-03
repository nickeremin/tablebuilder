const Searchbar = () => {
  return <div>Searchbar</div>
}

export default Searchbar

// "use client"

// import { useCallback, useEffect, useState, useTransition } from "react"
// import { usePathname, useRouter } from "next/navigation"

// import { Icons } from "@/shared/components/icons"
// import { Button } from "@/shared/components/ui/button"
// import {
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/shared/components/ui/command"
// import { Skeleton } from "@/shared/components/ui/skeleton"
// import { useDebounce } from "@/shared/lib/hooks"
// import { cn } from "@/shared/lib/utils"
// import { Table } from "@/shared/types"
// import { filterTables } from "@/app/_actions/table"

// type TableGroup = {
//   type: Table["type"]
//   tables: Pick<Table, "id" | "name">[]
// }

// const Searchbar = () => {
//   const pathname = usePathname() as string

//   if (!pathname.includes("dashboard")) return null

//   const router = useRouter()
//   const [query, setQuery] = useState("")
//   const [data, setData] = useState<TableGroup[] | null>(null)
//   const debouncedQuery = useDebounce(query, 300)
//   const [isOpen, setIsOpen] = useState(false)
//   const [isPending, startTransition] = useTransition()

//   const handleSelect = useCallback((callback: () => unknown) => {
//     setIsOpen(false)
//     callback()
//   }, [])

//   useEffect(() => {
//     if (debouncedQuery.length <= 0) {
//       setData(null)
//       return
//     }

//     let mounted = true
//     const fetchData = () => {
//       startTransition(async () => {
//         const data = await filterTables(debouncedQuery)

//         if (mounted) {
//           setData(data)
//         }
//       })
//     }

//     fetchData()

//     return () => {
//       mounted = false
//     }
//   }, [debouncedQuery])

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault()
//         setIsOpen((isOpen) => !isOpen)
//       }
//     }
//     window.addEventListener("keydown", handleKeyDown)
//     return () => window.removeEventListener("keydown", handleKeyDown)
//   }, [])

//   useEffect(() => {
//     if (!isOpen) {
//       setQuery("")
//     }
//   }, [isOpen])

//   return (
//     <>
//       <Button
//         variant="outline"
//         className="relative h-9 w-9 p-0 text-sm xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
//         onClick={() => setIsOpen(true)}
//       >
//         <Icons.search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
//         <span className="hidden xl:inline-flex">Поиск таблиц...</span>
//         <span className="sr-only">Поиск таблиц</span>
//         <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
//           <abbr title="Control">Ctrl+</abbr>K
//         </kbd>
//       </Button>
//       <CommandDialog position="top" open={isOpen} onOpenChange={setIsOpen}>
//         <CommandInput
//           placeholder="Поиск таблиц..."
//           value={query}
//           onValueChange={setQuery}
//         />
//         <CommandList>
//           <CommandEmpty
//             className={cn(isPending ? "hidden" : "py-6 text-center text-sm")}
//           >
//             Таблиц не найдено.
//           </CommandEmpty>
//           {isPending ? (
//             <div className="space-y-1 overflow-hidden px-1 py-2">
//               <Skeleton className="h-4 w-10 rounded" />
//               <Skeleton className="h-8 rounded-sm" />
//               <Skeleton className="h-8 rounded-sm" />
//             </div>
//           ) : (
//             data?.map((group) => (
//               <CommandGroup
//                 key={group.type}
//                 className="capitalize"
//                 heading={group.type}
//               >
//                 {group.tables.map((table) => (
//                   <CommandItem
//                     key={table.id}
//                     value={table.name}
//                     className="hover:cursor-pointer"
//                     onSelect={() =>
//                       handleSelect(() =>
//                         router.push(`/dashboard/tables/${table.id}`)
//                       )
//                     }
//                   >
//                     <span className="truncate">{table.name}</span>
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             ))
//           )}
//         </CommandList>
//       </CommandDialog>
//     </>
//   )
// }

// export default Searchbar
