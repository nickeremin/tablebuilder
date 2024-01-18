"use client"

import React from "react"
import { icons } from "lucide-react"
import { useTheme } from "next-themes"

import { LucideIcon } from "@/shared/components/icons"
import { Label } from "@/shared/components/ui/label"

type Theme = {
  title: string
  mode: "light" | "dark" | "system"
  icon: keyof typeof icons
}

export const themes: Theme[] = [
  {
    title: "Светлая",
    mode: "light",
    icon: "Sun",
  },
  {
    title: "Темная",
    mode: "dark",
    icon: "Moon",
  },
  {
    title: "Системная",
    mode: "system",
    icon: "Monitor",
  },
]

function ThemeSelect() {
  const themeSelectId = React.useId()
  const { theme, setTheme } = useTheme()
  const [selectedTheme, setSelectedTheme] = React.useState(() =>
    themes.find((item) => item.mode === theme)
  )

  React.useEffect(() => {
    setSelectedTheme(themes.find((t) => t.mode === theme))
  }, [theme])

  return (
    <Label htmlFor={themeSelectId} className="group relative flex items-center">
      <span className="pointer-events-none absolute left-1.5 text-muted-foreground transition-colors group-hover:text-primary">
        <LucideIcon name={selectedTheme?.icon!} className="sm:h-4 sm:w-4" />
      </span>
      <select
        aria-invalid="false"
        aria-label="Сменить цветовую тему"
        id={themeSelectId}
        value={theme}
        onChange={(e) => {
          setTheme(e.target.value)
        }}
        className="search-input-border h-8 cursor-pointer appearance-none rounded-md bg-accent px-8 text-primary outline-none transition-all  sm:h-6 sm:pl-7 sm:pr-5 sm:text-xs"
      >
        {themes.map((theme, i) => (
          <option key={i} value={theme.mode}>
            {theme.title}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-1 text-muted-foreground transition-colors group-hover:text-primary">
        <LucideIcon name="ChevronsUpDown" className="h-4 w-4 sm:h-3 sm:w-3" />
      </span>
    </Label>
  )
}

export default ThemeSelect
