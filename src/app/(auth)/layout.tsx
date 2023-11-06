import * as React from "react"

import { AuthNav } from "@/widgets/layout/auth"
import { SiteFooter } from "@/widgets/layout/home"

interface AuthLayoutProps {
  children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="relative min-h-screen">
        <AuthNav />
        {children}
      </div>
      <SiteFooter />
    </div>
  )
}

export default AuthLayout
