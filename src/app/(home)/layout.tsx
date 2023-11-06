import * as React from "react"

import { HomeNav, SiteFooter } from "@/widgets/layout/home"

interface HomeLayoutProps {
  children: React.ReactNode
}

function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div>
      <div className="relative min-h-screen">
        <HomeNav />
        {children}
      </div>
      <SiteFooter />
    </div>
  )
}

export default HomeLayout
