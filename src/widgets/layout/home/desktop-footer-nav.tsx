import Link from "next/link"

import { Icons } from "@/shared/components/icons"
import LogoIcon from "@/shared/components/logo"
import { buttonVariants } from "@/shared/components/ui/button"
import { footerLinks } from "@/shared/config/site/nav"
import { cn } from "@/shared/lib/utils"

import ThemeToggle from "../theme-toggle"

function DesktopFooterNav() {
  return (
    <div className="hidden w-full grid-cols-[.9fr_repeat(3,1fr)_100px] gap-6 lg:grid">
      <div className="flex flex-1 flex-col justify-between gap-[10px] pt-[10px]">
        {/* Logo link */}
        <div className="flex items-center gap-3">
          <Link href="/" className="-m-[3px] p-[3px]">
            <LogoIcon className="h-6 w-6" />
          </Link>
          <p className="whitespace-nowrap text-sm font-medium text-muted-foreground">
            &copy; 2023
          </p>
        </div>

        {/* System state */}
        <div className="-ml-2 flex h-9 max-w-[300px] cursor-default items-center gap-[6px] whitespace-nowrap rounded-md p-2 text-sm text-primary-blue transition-colors hover:bg-accent">
          <span className="inline-block h-[10px] w-[10px] rounded-full bg-primary-blue" />
          <small className="inline-block overflow-hidden overflow-ellipsis text-sm font-medium">
            Все системы в норме.
          </small>
        </div>

        {/* Github accout link */}
        <div className="mt-auto whitespace-nowrap text-sm/9 text-muted-foreground">
          Создано{" "}
          <Link
            href="/"
            className="font-semibold transition-colors hover:text-foreground"
          >
            nickeremin
          </Link>
          .
        </div>
      </div>

      {/* Desktop footer links */}
      {footerLinks.map((group) => (
        <div key={group.title} className="mb-6 flex flex-col">
          <label className="cursor-default">
            <h2 className="my-3 text-sm font-medium leading-5">
              {group.title}
            </h2>
          </label>
          <ul className="flex list-none flex-col">
            {group.items?.map((item) => (
              <li key={item.title} className="py-[6px]">
                <Link
                  href={item.href ?? "/"}
                  className="whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="flex flex-col items-end justify-end">
        <div className="flex items-center gap-1">
          {/* Github project link  */}
          <Link
            href="/"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              })
            )}
          >
            <Icons.gitHub className="h-6 w-6" />
          </Link>
          {/* Button to switch themes */}
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default DesktopFooterNav
