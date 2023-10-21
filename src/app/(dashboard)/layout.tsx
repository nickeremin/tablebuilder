import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { DashboardFooter, DashboardNav } from "@/widgets/layout"

interface DashboardLayoutProps {
  children: React.ReactNode
}

async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await currentUser()

  if (!user) redirect("/signin")

  return (
    <div className="relative flex min-h-screen flex-col">
      <DashboardNav />
      <div className="min-h-[calc(100vh-85px)]">{children}</div>
      <DashboardFooter />
    </div>
  )
}

export default DashboardLayout
