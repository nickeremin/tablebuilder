import { currentUser } from "@clerk/nextjs"

import { SiteHeader } from "@/widgets/layout"

interface LobbyLayoutProps {
  children: React.ReactNode
}

const LobbyLayout = async ({ children }: LobbyLayoutProps) => {
  const user = await currentUser()

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-80"></div>
      <SiteHeader user={user} />
      <main className="relative flex-1">{children}</main>
      {/* <SiteFooter /> */}
    </div>
  )
}

export default LobbyLayout
