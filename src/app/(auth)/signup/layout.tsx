import * as React from "react"

interface SignUpLayoutProps {
  children: React.ReactNode
}

function SignUpLayout({ children }: SignUpLayoutProps) {
  return <main>{children}</main>
}

export default SignUpLayout
