import * as React from "react"
import Link from "next/link"

interface LoginLayoutProps {
  children: React.ReactNode
}

function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col justify-center">
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        {/* Sign in form */}
        {children}
      </div>
      <div className="flex h-[100px] items-center justify-center border-t p-8 lg:border-none">
        <Link
          aria-label="Перейти на страницу регистрации"
          href="/signup"
          className="underline-link whitespace-nowrap text-sm text-link lg:hidden"
        >
          У вас нет учетной записи? Создать аккаунт
        </Link>
      </div>
    </main>
  )
}

export default LoginLayout
