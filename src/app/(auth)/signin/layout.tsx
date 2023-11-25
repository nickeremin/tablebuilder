import * as React from "react"

interface LoginLayoutProps {
  children: React.ReactNode
}

function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col justify-center">
      {children}
    </main>
  )
}

export default LoginLayout
