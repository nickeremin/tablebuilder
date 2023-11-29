import * as React from "react"

import { HomeHeader, SiteFooter, StarsBackground } from "@/widgets/layout"

interface HomeLayoutProps {
  children: React.ReactNode
}

function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div>
      <div className="relative min-h-screen">
        <HomeHeader />
        {children}
        <StarsBackground />
      </div>
      <SiteFooter />
    </div>
  )
}

export default HomeLayout
