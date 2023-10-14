import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { IconProps } from "@radix-ui/react-icons/dist/types"
import { cva } from "class-variance-authority"

interface Theme {
  title: string
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
  value: "system" | "dark" | "light"
}

export const themes: Theme[] = [
  {
    title: "Система",
    icon: DesktopIcon,
    value: "system",
  },
  {
    title: "Темная",
    icon: MoonIcon,
    value: "dark",
  },
  {
    title: "Светлая",
    icon: SunIcon,
    value: "light",
  },
]

export const themeVariants = cva("", {
  variants: {
    variant: {
      logo: "border-sky-600 bg-sky-600/10 dark:border-sky-700 dark:bg-sky-700/20",
      "bg-sky":
        "bg-sky-500  hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-500",
      "hover:bg-border-sky":
        "border-sky-500/40 bg-sky-500/5 text-sky-800/90 hover:bg-sky-500/10 hover:text-sky-800 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-100/90 dark:hover:bg-sky-500/20 dark:hover:text-sky-100",
    },
  },
})
