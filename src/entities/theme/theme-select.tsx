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

function ThemeSelectMobile() {
  const themeSelectId = React.useId()
  const { theme, setTheme } = useTheme()
  const [selectedTheme, setSelectedTheme] = React.useState(() =>
    themes.find((item) => item.mode === theme)
  )

  React.useEffect(() => {
    setSelectedTheme(themes.find((t) => t.mode === theme))
  }, [theme])

  return (
    <Label
      data-shadcnui-input-wrapper
      htmlFor={themeSelectId}
      className="group relative flex items-center overflow-hidden rounded-md"
    >
      <span className="pointer-events-none absolute left-1.5 text-tertiary transition-colors group-hover:text-primary">
        <LucideIcon name={selectedTheme!.icon} />
      </span>
      <select
        aria-invalid="false"
        aria-label="Сменить цветовую тему"
        id={themeSelectId}
        value={theme}
        onChange={(e) => {
          setTheme(e.target.value)
        }}
        className="h-8 cursor-pointer appearance-none bg-background-100 px-8 text-primary outline-none transition-all"
      >
        {themes.map((theme, i) => (
          <option key={i} value={theme.mode}>
            {theme.title}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-1 text-muted-foreground transition-colors group-hover:text-primary">
        <LucideIcon name="ChevronsUpDown" className="size-4" />
      </span>
    </Label>
  )
}

function ThemeSelectDesktop() {
  const themeSelectId = React.useId()
  const { theme, setTheme } = useTheme()
  const [selectedTheme, setSelectedTheme] = React.useState(() =>
    themes.find((item) => item.mode === theme)
  )

  React.useEffect(() => {
    setSelectedTheme(themes.find((t) => t.mode === theme))
  }, [theme])

  return (
    <Label
      data-shadcnui-input-wrapper
      htmlFor={themeSelectId}
      className="group relative flex items-center overflow-hidden rounded-md"
    >
      <span className="pointer-events-none absolute left-1.5 text-muted-foreground transition-colors group-hover:text-primary">
        <LucideIcon name={selectedTheme!.icon} className="size-4" />
      </span>
      <select
        aria-invalid="false"
        aria-label="Сменить цветовую тему"
        id={themeSelectId}
        value={theme}
        onChange={(e) => {
          setTheme(e.target.value)
        }}
        className="h-6 cursor-pointer appearance-none rounded-md bg-accent px-8 pl-7 pr-5 text-xs text-primary outline-none transition-all"
      >
        {themes.map((theme, i) => (
          <option key={i} value={theme.mode}>
            {theme.title}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-1 text-muted-foreground transition-colors group-hover:text-primary">
        <LucideIcon name="ChevronsUpDown" className="size-3" />
      </span>
    </Label>
  )
}

export { ThemeSelectMobile, ThemeSelectDesktop }
