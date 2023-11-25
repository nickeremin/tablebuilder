import * as React from "react"

import { StarsBackground } from "@/widgets/layout"
import { AuthNav } from "@/widgets/layout/auth"
import { SiteFooter } from "@/widgets/layout/home"

interface AuthLayoutProps {
  children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
      <div className="relative min-h-screen">
        <AuthNav />
        {children}
        <StarsBackground />
      </div>
      <SiteFooter />
    </div>
  )
}

export default AuthLayout
