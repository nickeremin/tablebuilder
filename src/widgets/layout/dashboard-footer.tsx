import React from "react"
import Link from "next/link"
import { LogoIcon } from "@/entities"

const DashboardFooter = () => {
  return (
    <footer className="border-t border-border px-6 py-5 text-sm lg:pb-8 lg:pt-7">
      <nav className="mx-auto flex max-w-screen-xl flex-nowrap justify-between space-x-4">
        <div className="flex w-full items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center">
              <LogoIcon className="mr-2 h-6 w-6" />
              <span className="text-lg font-semibold">Tablebuilder</span>
            </Link>
            <span className="font-medium text-primary/80">&copy; 2023</span>
          </div>

          {/* TODO: Command menu */}
          <div className="ml-auto flex items-center pl-3 pr-1">
            Command menu
          </div>

          {/* TODO: Themesbar */}
          <div className="flex items-center">Themesbar</div>
        </div>
      </nav>
      <nav className="mx-auto mt-8 max-w-screen-xl">
        <ul className="-mt-2.5 flex w-full list-none items-center justify-between">
          <li>
            <span>Создано </span>
            <Link href="/" className="underline">
              nickeremin
            </Link>
          </li>
          {/* TODO: footer links */}
          <li>Footer Links</li>
          <li>Social Media</li>
        </ul>
      </nav>
    </footer>
  )
}

export default DashboardFooter
