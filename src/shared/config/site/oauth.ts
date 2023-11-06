import { type OAuthStrategy } from "@clerk/nextjs/server"

import { Icons } from "@/shared/components/icons"

export const oauthProviders = [
  {
    label: "Продолжить с Google",
    name: "Google",
    strategy: "oauth_google",
    icon: "google",
    background: "bg-[rgb(66,134,244)] hover:bg-[rgba(66,134,244,.85)]",
  },
  {
    label: "Продолжить с GitHub",
    name: "GitHub",
    strategy: "oauth_github",
    icon: "gitHub",
    background: "bg-[rgb(36,41,46)] hover:bg-[rgba(36,41,46,.85)]",
  },
  {
    label: "Продолжить с Discord",
    name: "Discord",
    strategy: "oauth_discord",
    icon: "discord",
    background: "bg-[rgb(114,137,218)] hover:bg-[rgba(114,137,218,.85)]",
  },
] satisfies {
  label: string
  name: string
  icon: keyof typeof Icons
  strategy: OAuthStrategy
  background: string
}[]
