import Link from "next/link"
import { User } from "@clerk/nextjs/server"

import { Searchbar } from "@/features/filters"
import { ThemeToggler } from "@/shared/components/theme-toggler"

interface SiteHeaderProps {
  user: User | null
}

const SiteHeader = ({ user }: SiteHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">Tablebuilder</h1>
        </Link>
        <div className="flex items-center gap-4">
          {user ? <Searchbar /> : null}
          <ThemeToggler />
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
