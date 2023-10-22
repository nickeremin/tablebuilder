import * as React from "react"
import Link from "next/link"

interface LoginLayoutProps {
  children: React.ReactNode
}

function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col justify-center">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6">
        <h1 className="text-center text-[32px] font-bold sm:text-[40px]">
          Войдите в Tablebuilder
        </h1>
        {/* Sign in form */}
        {children}
      </div>
      <div className="flex h-[100px] items-center justify-center border-t p-8 lg:border-none">
        <Link
          href="/signup"
          className="underline-link text-sm text-link lg:hidden"
        >
          У вас нет учетной записи? Создать аккаунт
          <span className="sr-only">
            У вас нет учетной записи? Создать аккаунт
          </span>
        </Link>
      </div>
    </main>
  )
}

export default LoginLayout
