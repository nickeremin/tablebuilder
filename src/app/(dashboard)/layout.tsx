// import { redirect } from "next/navigation"
// import { currentUser } from "@clerk/nextjs"

import { DashboardHeader, SiteFooter } from "@/widgets/layout"

interface DashboardLayoutProps {
  children: React.ReactNode
}

async function DashboardLayout({ children }: DashboardLayoutProps) {
  // const user = await currentUser()

  // if (!user) redirect("/signin")

  return (
    <div className="relative min-h-screen">
      <DashboardHeader />
      <div className="min-h-[calc(100vh-85px)]">{children}</div>
      <SiteFooter />
    </div>
  )
}

export default DashboardLayout
