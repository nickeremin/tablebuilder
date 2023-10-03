import Link from "next/link"

import { ThemeToggler } from "@/features/tools"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative flex min-h-screen overflow-hidden">
      <div className="absolute right-4 top-4 z-20">
        <ThemeToggler />
      </div>
      <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-70"></div>
      <main className="container absolute top-1/2 flex -translate-y-1/2 flex-col justify-center space-y-4 md:static md:top-0 md:translate-y-0">
        <Link href="/">
          <h1 className="text-center text-5xl font-extrabold xs:text-6xl">
            Tablebuilder
          </h1>
        </Link>
        {children}
      </main>
    </div>
  )
}

export default AuthLayout
