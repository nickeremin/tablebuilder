import * as React from "react"

import { AuthHeader, SiteFooter, StarsBackground } from "@/widgets/layout"

interface AuthLayoutProps {
  children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
      <div className="relative min-h-screen">
        <AuthHeader />
        {children}
        <StarsBackground />
      </div>
      <SiteFooter />
    </div>
  )
}

export default AuthLayout
